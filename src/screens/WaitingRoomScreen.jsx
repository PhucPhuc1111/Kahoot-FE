import React from "react";
import { Spin, Typography } from "antd";

const { Title, Text } = Typography;
import { LoadingOutlined } from "@ant-design/icons";
const WaitingRoomScreen = ({ playerName = "Player Name" }) => {
  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #ffccd5, #ff85a1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Roboto', sans-serif",
        textAlign: "center",
      }}
    >
      <Title
        level={2}
        style={{
          color: "#fff",
          textShadow: "1px 1px 6px rgba(0,0,0,0.3)",
          marginBottom: "24px",
        }}
      >
        👋 Welcome, {playerName}!
      </Title>
      <div style={{ marginTop: 16 }}>
        <Spin
          indicator={
            <LoadingOutlined style={{ fontSize: 32, color: "white" }} spin />
          }
        />
      </div>
      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <Text
          style={{
            fontSize: 18,
            color: "#ffffff",
            fontWeight: "bold",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
          }}
        >
          Waiting for the host to start the game...
        </Text>
      </div>
    </div>
  );
};

export default WaitingRoomScreen;
