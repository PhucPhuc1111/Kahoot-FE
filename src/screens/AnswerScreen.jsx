import React, { useState, useEffect } from "react";
import { Typography } from "antd";

const { Title } = Typography;

const answers = [
  { text: "1888", color: "#ff6f91" }, // Soft coral pink
  { text: "1905", color: "#ff8da1" }, // Light pink
  { text: "1912", color: "#f06292" }, // Hot pink
  { text: "1942", color: "#ffabc1" }, // Blush pink
];

const AnswerScreen = () => {
  const [timeLeft, setTimeLeft] = useState(20);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleAnswer = (answer) => {
    setScore((prev) => prev + 10);
    alert(`You selected: ${answer}`);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #ffe4e6 0%, #fbcfe8 100%)",
        padding: "1rem",
        fontFamily: "'Inter', 'Poppins', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        overflow: "auto",
      }}
    >
      {/* Question */}
      <Title
        level={2}
        style={{
          textAlign: "center",
          color: "#ad1457",
          margin: "0 0 1.5rem",
          fontWeight: 700,
          fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
          lineHeight: 1.2,
        }}
      >
        When did the first cornea transplant take place?
      </Title>

      {/* Timer, Image, Score Container */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1400px",
          marginBottom: "2rem",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {/* Timer */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "#ec4899",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.8rem",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            flexShrink: 0,
          }}
        >
          {timeLeft}
        </div>

        <div
          style={{
            minWidth: "300px",
            width: "400px",
            height: "250px",
            borderRadius: "0.75rem",
            overflow: "hidden",
            background: "#fce4ec",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            flexShrink: 0,
          }}
        >
          <img
            src="https://lienquan.garena.vn/wp-content/uploads/2024/05/ea4408de26b25e684372f0298d838837658d3f256a9ce-2.jpg"
            alt="Question visual"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Score */}
        <div
          style={{
            minWidth: "120px",
            padding: "0.75rem",
            background: "#f06292",
            color: "#fff",
            textAlign: "center",
            borderRadius: "0.75rem",
            fontWeight: 600,
            fontSize: "1.2rem",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            flexShrink: 0,
          }}
        >
          {score}
          <br />
          Points
        </div>
      </div>

      {/* Answers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(250px, 1fr))", // 2 cột
          gridTemplateRows: "repeat(2, auto)", // 2 hàng
          gap: "1rem",
          width: "100%",
          maxWidth: "1400px", // Mở rộng hơn
        }}
      >
        {answers.map((answer, index) => (
          <div
            key={index}
            onClick={() => handleAnswer(answer.text)}
            style={{
              backgroundColor: answer.color,
              padding: "1.5rem 2rem", // Kéo dài câu trả lời
              borderRadius: "0.75rem",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1.5rem",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              minHeight: "80px", // Đảm bảo chiều cao đồng đều
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
            }}
          >
            {answer.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerScreen;
