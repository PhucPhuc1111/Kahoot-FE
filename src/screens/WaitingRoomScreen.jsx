import React, { useEffect, useState, useCallback } from "react";
import { Card, Typography, Spin, Tag } from "antd";
import { LoadingOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import useSignalR from "../hooks/useSignalR"; // Import useSignalR hook
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const { Title, Text } = Typography;

const WaitingRoomScreen = () => {
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isJoining, setIsJoining] = useState(false); // State to handle loading/disabling button
  const [joinError, setJoinError] = useState(null); // State to display join errors
  const [groups, setGroups] = useState([]); // You might use this later based on hub responses
  const navigate = useNavigate(); // Use useNavigate from react-router-dom
  const location = useLocation();
  const { teamId } = location.state || {};
  const sessionCode = localStorage.getItem("sessionCode");

  const handleUpdateGroups = useCallback((updatedGroups) => {
    console.log("✅ Update groups:", updatedGroups);
    navigate("/answer"); // Navigate to the game screen
  }, []); // Mảng dependency rỗng

  // --- SignalR Connection Setup ---

  const connectionRef = useSignalR({
    baseHubUrl:
      "https://fptkahoot-eqebcwg8aya7aeea.southeastasia-01.azurewebsites.net/gamehubs",
    token: localStorage.getItem("token"),
    onUpdateGroups: handleUpdateGroups,
  });

  useEffect(() => {
    const joinSessionIfConnected = async () => {
      const connection = connectionRef?.current;
      if (connection && connection.state === "Connected") {
        try {
          await connection.invoke("JoinSession", sessionCode);
          console.log("📥 Joined session:", sessionCode);
        } catch (err) {
          console.error("❌ Failed to join session:", err);
        }
      }
    };

    const timer = setTimeout(joinSessionIfConnected, 1000);

    return () => clearTimeout(timer);
  }, [connectionRef, sessionCode]);

  useEffect(() => {
    const fetchTeamScore = async () => {
      const token = localStorage.getItem("token");
      try {
        setLoading(true);
        console.log("Fetching team data with token:", token);
        const response = await fetch(
          `https://fptkahoot-eqebcwg8aya7aeea.southeastasia-01.azurewebsites.net/api/team/${teamId}/score`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
        const text = await response.text();
        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status}, Response: ${text}`
          );
        }
        const result = JSON.parse(text); // Manually parse JSON
        console.log("Parsed result:", result); // Log the parsed result
        if (result.statusCode === 200) {
          setTeamData(result.data);
        } else {
          throw new Error(result.message || "API error");
        }
      } catch (err) {
        console.error("Fetch error:", err); // Log the error
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamScore();
  }, [teamId]);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          background: "linear-gradient(135deg, #00f2fe, #ff6ec4, #f9cb28)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin
          indicator={
            <LoadingOutlined style={{ fontSize: 32, color: "white" }} spin />
          }
        />
        <Text
          style={{
            fontSize: 18,
            color: "#ffffff",
            fontWeight: "bold",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
            display: "block",
            marginTop: 16,
          }}
        >
          Loading team data...
        </Text>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          height: "100vh",
          background: "linear-gradient(135deg, #00f2fe, #ff6ec4, #f9cb28)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#ffffff",
            fontWeight: "bold",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
          }}
        >
          Error: {error}
        </Text>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #00f2fe, #ff6ec4, #f9cb28)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Roboto', sans-serif",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <Title
        level={2}
        style={{
          color: "#fff",
          textShadow: "1px 1px 6px rgba(0,0,0,0.3)",
          marginBottom: "8px",
        }}
      >
        👋 Welcome Kahoot!
      </Title>

      <Text
        style={{
          fontSize: 18,
          color: "#ffffff",
          fontWeight: "bold",
          marginBottom: "24px",
          textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
        }}
      >
        You're in <span style={{ color: "#ffd6e0" }}>{teamData.teamName}</span>
      </Text>

      <Card
        title={
          <span style={{ color: "#d81b60", fontWeight: "bold" }}>
            <TeamOutlined style={{ marginRight: 8 }} />
            {teamData.teamName}
          </span>
        }
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: 16,
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            justifyContent: "center",
          }}
        >
          {teamData.players.map((player, index) => (
            <Tag
              key={index}
              color="pink"
              style={{
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: 14,
                fontWeight: "bold",
                color: "#d81b60",
                background: "#fff0f6",
                border: "1px solid #ff85a1",
              }}
            >
              {player.imageUrl ? (
                <img
                  src={player.imageUrl}
                  alt={player.name}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    marginRight: 6,
                  }}
                />
              ) : (
                <UserOutlined style={{ marginRight: 6 }} />
              )}
              {player.name}
            </Tag>
          ))}
        </div>
      </Card>

      <div style={{ marginTop: 32 }}>
        <Spin
          indicator={
            <LoadingOutlined style={{ fontSize: 32, color: "white" }} spin />
          }
        />
        <Text
          style={{
            fontSize: 18,
            color: "#ffffff",
            fontWeight: "bold",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
            display: "block",
            marginTop: 16,
          }}
        >
          Waiting for the host to start the game...
        </Text>
      </div>
    </div>
  );
};

export default WaitingRoomScreen;
