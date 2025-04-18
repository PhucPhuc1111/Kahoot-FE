import React from "react";
import { Card, Typography, Spin, Space, Tag } from "antd";
import {
  LoadingOutlined,
  UserOutlined,
  CodeOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const fakePlayers = [
  { name: "Alice" },
  { name: "Bob" },
  { name: "Charlie" },
  { name: "Daisy" },
  { name: "Eve" },
  { name: "Frank" },
  { name: "Grace" },
  { name: "Helen" },
  { name: "Ivan" },
  { name: "Jack" },
  { name: "Karen" },
  { name: "Leo" },
  { name: "Mia" },
  { name: "Nina" },
];

const ListOfParticipantsScreen = () => {
  const roomCode = "123456";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ffccd5, #ff85a1)",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {/* Header */}
      <Card
        bordered={false}
        style={{
          width: "100%",
          maxWidth: "1100px",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
          marginBottom: "32px",
          padding: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <Space>
            <TeamOutlined style={{ fontSize: 24, color: "#ff4d7e" }} />
            <Text
              strong
              style={{
                fontSize: 20,
                color: "#ff4d7e",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              {fakePlayers.length} PLAYERS
            </Text>
          </Space>

          <Title
            level={2}
            style={{
              margin: 0,
              color: "#d81b60",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              animation: "pulse 2s infinite",
            }}
          >
            🎉 WAITING ROOM
          </Title>

          <Space>
            <CodeOutlined style={{ fontSize: 20, color: "#ff4d7e" }} />
            <Text
              style={{
                fontSize: 18,
                color: "#d81b60",
                fontWeight: "bold",
              }}
            >
              GAME PIN: <span style={{ color: "#ff4081" }}>{roomCode}</span>
            </Text>
          </Space>
        </div>
      </Card>

      <Card
        style={{
          maxWidth: "1100px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
          padding: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          {fakePlayers.map((player, index) => (
            <Tag
              key={index}
              color="pink"
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: 16,
                fontWeight: "bold",
                color: "#d81b60",
                background: "#fff0f6",
                border: "1px solid #ff85a1",
                transition: "transform 0.2s",
                cursor: "default",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <UserOutlined style={{ color: "#ff4081" }} />
              {player.name}
            </Tag>
          ))}
        </div>
      </Card>

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
        <div style={{ marginTop: 16 }}>
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 32, color: "#ff4081" }}
                spin
              />
            }
          />
        </div>
      </div>
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default ListOfParticipantsScreen;
