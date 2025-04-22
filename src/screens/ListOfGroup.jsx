import React from "react";
import { Card, Typography, Space, Tag, Row, Col, Divider } from "antd";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const groupData = [
  {
    name: "Group 1",
    members: ["Alice", "Bob", "Charlie"],
    max: 5,
  },
  {
    name: "Group 2",
    members: ["Daisy", "Eve"],
    max: 5,
  },
  {
    name: "Group 3",
    members: ["Frank", "Grace", "Helen", "Ivan"],
    max: 5,
  },
];

const ListOfGroups = () => {
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
              {groupData.reduce((acc, g) => acc + g.members.length, 0)} PLAYERS
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

      <Row gutter={[24, 24]} style={{ maxWidth: "1100px", width: "100%" }}>
        {groupData.map((group, idx) => (
          <Col xs={24} sm={12} md={8} key={idx}>
            <Card
              title={
                <div style={{ color: "#d81b60", fontWeight: "bold" }}>
                  {group.name}
                </div>
              }
              bordered={false}
              style={{
                borderRadius: 16,
                background: "rgba(255,255,255,0.95)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ marginBottom: 8 }}>
                <Text strong>
                  Member: {group.members.length}/{group.max}
                </Text>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {group.members.map((member, index) => (
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
                    {member}
                  </Tag>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

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

export default ListOfGroups;
