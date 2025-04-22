import React from "react";
import { Card, Typography, Spin, Tag } from "antd";
import { LoadingOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const WaitingRoomScreen = ({
  playerName = "Player Name",
  groupName = "Nhóm 1",
  members = ["Alice", "Bob", "Charlie", "You"],
}) => {
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
        👋 Welcome, {playerName}!
      </Title>

      <Text
        style={{
          fontSize: 18,
          color: "#ffffff",
          fontWeight: "bold",
          marginBottom: "24px",
          textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
        }}
      >
        You're in <span style={{ color: "#ffd6e0" }}>{groupName}</span>
      </Text>

      <Card
        title={
          <span style={{ color: "#d81b60", fontWeight: "bold" }}>
            <TeamOutlined style={{ marginRight: 8 }} />
            {groupName}
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
          {members.map((name, index) => (
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
              <UserOutlined style={{ marginRight: 6 }} />
              {name}
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
