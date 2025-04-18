import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const answers = [
  { text: "Answer A", color: "#f06292" },
  { text: "Answer B", color: "#ba68c8" },
  { text: "Answer C", color: "#4db6ac" },
  { text: "Answer D", color: "#ffb74d" },
];

const AnswerScreen = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ffccd5, #ff85a1)",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Roboto', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Particles */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              background: "rgba(255, 255, 255, 0.3)",
              borderRadius: "50%",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatUp ${10 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <Title
        level={2}
        style={{
          textAlign: "center",
          color: "#ffffff",
          textShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)",
          marginBottom: "16px",
          animation: "pulse 2s infinite",
          zIndex: 1,
        }}
      >
        ❓ Choose the correct answer!
      </Title>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "16px",
          width: "100%",
          maxWidth: "1200px",
          height: "calc(100vh - 120px)",
          zIndex: 1,
        }}
      >
        {answers.map((answer, index) => (
          <div
            key={index}
            onClick={() => alert(`You selected: ${answer.text}`)}
            style={{
              background: answer.color,
              color: "#fff",
              fontSize: "2.2rem",
              fontWeight: "bold",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {answer.text}
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }

          @keyframes floatUp {
            0% {
              transform: translateY(0) translateX(0);
              opacity: 0.6;
            }
            50% {
              opacity: 0.3;
            }
            100% {
              transform: translateY(-100vh) translateX(${
                Math.random() * 100 - 50
              }px);
              opacity: 0.6;
            }
          }

          @media (max-width: 768px) {
            .answer-grid {
              grid-template-columns: 1fr;
              grid-template-rows: repeat(4, 1fr);
            }
          }
        `}
      </style>
    </div>
  );
};

export default AnswerScreen;
