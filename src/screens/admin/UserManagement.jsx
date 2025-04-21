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
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const initialUsers = [
  { id: 1, name: "Nguyễn Văn A", email: "a@example.com", role: "User" },
  { id: 2, name: "Trần Thị B", email: "b@example.com", role: "Admin" },
  { id: 3, name: "Lê Văn C", email: "c@example.com", role: "User" },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchText, users]);

  const showEditModal = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setEditingUser(null);
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingUser) {
        const updatedUsers = users.map((user) =>
          user.id === editingUser.id ? { ...editingUser, ...values } : user
        );
        setUsers(updatedUsers);
        message.success("Cập nhật người dùng thành công!");
      } else {
        const newUser = { id: Date.now(), ...values };
        setUsers([...users, newUser]);
        message.success("Thêm người dùng mới thành công!");
      }
      handleCancel();
    });
  };

  const handleDelete = (id) => {
    const updated = users.filter((user) => user.id !== id);
    setUsers(updated);
    message.success("Xóa người dùng thành công!");
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            style={{ borderColor: "#ff85a1", color: "#d81b60" }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa người dùng này không?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
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

          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{
              backgroundColor: "#ff4081",
              borderColor: "#ff4081",
              fontWeight: "bold",
              borderRadius: 8,
            }}
            onClick={() => {
              setEditingUser(null);
              form.resetFields();
              setIsModalVisible(true);
            }}
          >
            Add New User
          </Button>
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

      <Modal
        title={editingUser ? "Update User" : "Add New User"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: "Please input user name" }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input user email!" },
              { type: "email", message: "Email is not valid" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please choose role!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

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
