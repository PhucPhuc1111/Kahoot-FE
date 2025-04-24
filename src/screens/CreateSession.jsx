import React, { useState } from "react";
import {
  Card,
  Typography,
  Input,
  Button,
  Form,
  Space,
  message,
  Tooltip,
} from "antd";
import {
  PlusCircleOutlined,
  SmileOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;
const MAX_SESSION_LENGTH = 30;
const MAX_GROUP_LENGTH = 20;

const token = "Bearer YOUR_TOKEN_HERE";

const CreateSession = ({ onCreate }) => {
  const [sessionName, setSessionName] = useState("");
  const [groups, setGroups] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();

  const handleAddGroup = () => {
    const newId = Date.now();
    setGroups([...groups, { id: newId, name: `Group ${groups.length + 1}` }]);
  };

  const handleRemoveGroup = (id) => {
    setGroups(groups.filter((g) => g.id !== id));
  };

  const handleEditGroup = (id) => {
    setEditingId(id);
  };

  const handleSaveEdit = (id, value) => {
    if (!value.trim()) {
      message.error("Tên nhóm không được để trống");
      return;
    }
    if (value.length > MAX_GROUP_LENGTH) {
      message.error(`Tên nhóm không quá ${MAX_GROUP_LENGTH} ký tự`);
      return;
    }

    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, name: value } : g))
    );
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!sessionName.trim()) {
      message.error("Vui lòng nhập tên session");
      return;
    }
    if (sessionName.length > MAX_SESSION_LENGTH) {
      message.error(`Tên session không quá ${MAX_SESSION_LENGTH} ký tự`);
      return;
    }
    if (groups.length < 2) {
      message.error("Cần ít nhất 2 nhóm để bắt đầu");
      return;
    }
    if (groups.some((g) => !g.name.trim())) {
      message.error("Tên nhóm không được để trống");
      return;
    }

    try {
      const sessionRes = await axios.post(
        "https://fptkahoot-eqebcwg8aya7aeea.southeastasia-01.azurewebsites.net/api/session",
        {
          quizId: 13,
          sessionName,
        },
        { headers: { Authorization: token } }
      );

      const sessionCode = sessionRes.data?.data?.sessionCode;

      await Promise.all(
        groups.map((group) =>
          axios.post(
            "https://fptkahoot-eqebcwg8aya7aeea.southeastasia-01.azurewebsites.net/api/team",
            {
              sessionCode,
              teamName: group.name,
            },
            {
              headers: { Authorization: token },
            }
          )
        )
      );

      message.success("🎉 Tạo phiên chơi và nhóm thành công!");
      if (onCreate) onCreate({ sessionName, sessionCode });
    } catch (err) {
      console.error(err);
      message.error("❌ Có lỗi xảy ra khi tạo session hoặc nhóm!");
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
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 500,
          padding: 24,
          borderRadius: 16,
          boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          background: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={3} style={{ color: "#d81b60" }}>
            <SmileOutlined /> Create a Session
          </Title>
          <Text type="secondary">Start your game with teams!</Text>
        </div>

        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <Form.Item
            label="Session Name"
            rules={[{ required: true, message: "Please enter a session name" }]}
          >
            <Input
              placeholder="Enter session name"
              value={sessionName}
              maxLength={MAX_SESSION_LENGTH}
              onChange={(e) => setSessionName(e.target.value)}
              size="large"
              style={{
                background: "#fff0f6",
                border: "2px solid #f48fb1",
                borderRadius: "12px",
                fontWeight: "bold",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                color: "#d81b60",
              }}
            />
          </Form.Item>

          <Form.Item label="Teams">
            <Space direction="vertical" style={{ width: "100%" }} size="middle">
              {groups.map((group) => (
                <div
                  key={group.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    background: "linear-gradient(135deg, #fff0f6, #ffebee)",
                    border: "2px solid #f48fb1",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                >
                  {editingId === group.id ? (
                    <Input
                      defaultValue={group.name}
                      onBlur={(e) => handleSaveEdit(group.id, e.target.value)}
                      onPressEnter={(e) =>
                        handleSaveEdit(group.id, e.target.value)
                      }
                      autoFocus
                      maxLength={MAX_GROUP_LENGTH}
                      style={{
                        background: "#fff",
                        border: "1px solid #f48fb1",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        color: "#d81b60",
                        width: "300px",
                      }}
                    />
                  ) : (
                    <Text
                      strong
                      onClick={() => handleEditGroup(group.id)}
                      style={{
                        cursor: "pointer",
                        color: "#d81b60",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {group.name}
                    </Text>
                  )}

                  <Tooltip title="Xóa">
                    <Button
                      icon={<DeleteOutlined />}
                      size="middle"
                      shape="circle"
                      style={{
                        background: "#f48fb1",
                        border: "none",
                        color: "#fff",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#d81b60";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#f48fb1";
                      }}
                      onClick={() => handleRemoveGroup(group.id)}
                    />
                  </Tooltip>
                </div>
              ))}

              <Button
                type="dashed"
                icon={<PlusCircleOutlined />}
                block
                onClick={handleAddGroup}
                style={{
                  background: "linear-gradient(to right, #f9cb28, #ff6ec4)",
                  color: "#fff",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  height: "40px",
                  marginTop: "8px",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Thêm Nhóm
              </Button>
            </Space>
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
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
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
