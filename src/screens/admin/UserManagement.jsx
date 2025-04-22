import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Modal,
  Form,
  message,
  Popconfirm,
  Card,
  Typography,
} from "antd";
import { SearchOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const initialUsers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "a@example.com",
    role: "User",
    isBlocked: false,
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "b@example.com",
    role: "Admin",
    isBlocked: false,
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "c@example.com",
    role: "User",
    isBlocked: false,
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [form] = Form.useForm();

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchText, users]);

  const handleBlockToggle = (id) => {
    const updated = users.map((user) =>
      user.id === id ? { ...user, isBlocked: !user.isBlocked } : user
    );
    setUsers(updated);
    message.success("User status updated!");
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Status",
      dataIndex: "isBlocked",
      key: "status",
      render: (isBlocked) => (
        <Text type={isBlocked ? "danger" : "success"}>
          {isBlocked ? "Blocked" : "Active"}
        </Text>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space>
          <Popconfirm
            title={`Are you sure to ${
              record.isBlocked ? "unblock" : "block"
            } this user?`}
            onConfirm={() => handleBlockToggle(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger={record.isBlocked === false}
              type={record.isBlocked ? "default" : "primary"}
              icon={<LockOutlined />}
            >
              {record.isBlocked ? "Unblock" : "Block"}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
          marginBottom: "24px",
          padding: "24px 32px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div>
            <Title level={3} style={{ margin: 0, color: "#d81b60" }}>
              User Management
            </Title>
            <Text type="secondary" style={{ fontSize: 14 }}>
              Total: <b>{users.length}</b> users
            </Text>
          </div>
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
        <Input
          placeholder="Tìm kiếm người dùng..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{
            marginBottom: 16,
            borderRadius: 8,
            borderColor: "#ff85a1",
          }}
        />

        <Table
          dataSource={filteredUsers}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>

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

export default UserManagement;
