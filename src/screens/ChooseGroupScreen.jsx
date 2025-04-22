import React from "react";
import { Card, Typography, Row, Col } from "antd";

const { Title } = Typography;

const mockGroups = [
  { id: 1, name: "Group 1", color: "#ff6ec4" },
  { id: 2, name: "Group 2", color: "#00f2fe" },
  { id: 3, name: "Group 3", color: "#f9cb28" },
  { id: 4, name: "Group 4", color: "#7e57c2" },
];

const ChooseGroupScreen = ({ onSelectGroup }) => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #00f2fe, #ff6ec4, #f9cb28)",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
        fontFamily: "'Inter', 'Poppins', sans-serif",
      }}
    >
      <Title
        level={2}
        style={{
          color: "#fff",
          marginBottom: "2rem",
          textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        Choose Your Group
      </Title>

      <Row
        gutter={[24, 24]}
        justify="center"
        style={{ width: "100%", maxWidth: "1000px" }}
      >
        {mockGroups.map((group) => (
          <Col xs={24} sm={12} md={8} lg={6} key={group.id}>
            <Card
              hoverable
              onClick={() => onSelectGroup(group.id)}
              style={{
                backgroundColor: group.color,
                borderRadius: "1rem",
                textAlign: "center",
                color: "#fff",
                fontWeight: 600,
                fontSize: "1.2rem",
                boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
              }}
            >
              {group.name}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ChooseGroupScreen;
