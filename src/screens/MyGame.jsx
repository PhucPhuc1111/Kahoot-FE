import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from ".//MyGame.module.css";

export default function MyGame() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);
  const [resultDetail, setResultDetail] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch(
          "https://fptkahoot-eqebcwg8aya7aeea.southeastasia-01.azurewebsites.net/api/player/my-sessions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "*/*",
            },
          }
        );
        const data = await res.json();
        if (data.statusCode === 200) {
          setSessions(data.data.reverse()); // Newest sessions first
        }
      } catch (err) {
        console.error("Error fetching sessions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchSessions();
  }, [token]);

  const handleViewDetail = async (sessionCode) => {
    try {
      const res = await fetch(
        `https://fptkahoot-eqebcwg8aya7aeea.southeastasia-01.azurewebsites.net/api/player/result?sessionCode=${sessionCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
          },
        }
      );
      const data = await res.json();
      if (data.statusCode === 200) {
        setResultDetail(data.data);
        setShowModal(true);
        const selected = sessions.find((s) => s.sessionCode === sessionCode);
        setSelectedSession(selected);
      }
    } catch (err) {
      console.error("Error fetching result:", err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setResultDetail(null);
    setSelectedSession(null);
  };

  if (loading) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Game History</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Session Name</th>
            <th>Session Code</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.sessionId}>
              <td>{session.sessionName}</td>
              <td>{session.sessionCode}</td>
              <td>
                {session.endAt
                  ? new Date(session.endAt).toLocaleString()
                  : "In Progress"}
              </td>
              <td>
                <button
                  className={styles.detailButton}
                  onClick={() => handleViewDetail(session.sessionCode)}
                >
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && resultDetail && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={closeModal}>
              ✖
            </button>
            <h2 className={styles.modalTitle}>
              Session: {selectedSession?.sessionName}
            </h2>
            <p><strong>Session Code:</strong> {selectedSession?.sessionCode}</p>
            <p><strong>Total Score:</strong> {resultDetail.totalScore}</p>
            <p><strong>Answers:</strong> {resultDetail.answers?.length || 0}</p>

            <div className={styles.answerList}>
              {resultDetail.answers.map((item, index) => (
                <div
                  key={index}
                  className={styles.answerItem}
                  style={{
                    backgroundColor: item.isCorrect ? "#e8f5e9" : "#ffebee",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <p><strong>📝 Question {index + 1}:</strong> {item.questionText}</p>
                  <p>
                    👉 Your Answer:{" "}
                    <span style={{ color: item.isCorrect ? "green" : "red", fontWeight: "bold" }}>
                      {item.answerText}
                    </span>
                  </p>
                  <p>
                    🧮 Score:{" "}
                    <span style={{ color: item.isCorrect ? "green" : "red" }}>
                      {item.isCorrect ? `+${item.score}` : "Incorrect"}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
