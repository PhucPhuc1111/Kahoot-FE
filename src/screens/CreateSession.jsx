import React, { useState } from "react";
import { Card, Typography, Input, Button, Form, List } from "antd";
import {
  PlusCircleOutlined,
  SmileOutlined,
  EditOutlined,
  CheckOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const CreateSession = ({ onCreate }) => {
  const [sessionName, setSessionName] = useState("");
  const [teams, setTeams] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingName, setEditingName] = useState("");

  const handleAddTeam = () => {
    setTeams([...teams, `Team ${teams.length + 1}`]);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingName(teams[index]);
  };

  const handleSave = (index) => {
    const updated = [...teams];
    updated[index] = editingName;
    setTeams(updated);
    setEditingIndex(null);
    setEditingName("");
  };

  const handleSubmit = () => {
    if (sessionName && teams.length > 0) {
      onCreate({ sessionName, teams });
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #00f2fe, #ff6ec4, #f9cb28)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 480,
          padding: "24px",
          borderRadius: 16,
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          background: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={3} style={{ color: "#d81b60", marginBottom: 0 }}>
            <SmileOutlined /> Create a Session
          </Title>
          <Text type="secondary">
            Fill in the details to start your game session!
          </Text>
        </div>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Session Name"
            rules={[{ required: true, message: "Please enter a session name" }]}
          >
            <Input
              placeholder="Enter session name"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              size="large"
            />
          </Form.Item>

          <Form.Item label="Teams">
            <List
              bordered
              dataSource={teams}
              renderItem={(item, index) => (
                <List.Item>
                  {editingIndex === index ? (
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onPressEnter={() => handleSave(index)}
                      addonAfter={
                        <CheckOutlined
                          onClick={() => handleSave(index)}
                          style={{ cursor: "pointer", color: "#52c41a" }}
                        />
                      }
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>{item}</Text>
                      <EditOutlined
                        onClick={() => handleEdit(index)}
                        style={{ cursor: "pointer", color: "#d81b60" }}
                      />
                    </div>
                  )}
                </List.Item>
              )}
            />
            <Button
              type="dashed"
              icon={<PlusCircleOutlined />}
              onClick={handleAddTeam}
              style={{
                marginTop: 16,
                width: "100%",
                fontWeight: "bold",
                borderColor: "#d81b60",
                color: "#d81b60",
              }}
            >
              Add Team
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<PlusCircleOutlined />}
              size="large"
              style={{
                width: "100%",
                backgroundColor: "#d81b60",
                borderColor: "#d81b60",
                fontWeight: "bold",
              }}
            >
              Create Session
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateSession;
