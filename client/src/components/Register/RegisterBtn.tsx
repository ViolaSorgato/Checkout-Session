import { useState } from "react";
import "./RegisterBtn.css";
import { Button, Modal, Form, Input, message } from "antd";
import { NewUser, useUserContext } from "../../context/UserContext";

export default function RegisterBtn() {
  const {
    loggedInUser,
    registerUser,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
  } = useUserContext();

  //FUNCTIONS TO OPEN/CLOSE MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (!username || !email || !password) {
      message.error("Please fill in all fields before registering.");
      return;
    }

    const newUser: NewUser = {
      username,
      email,
      password,
    };
    await registerUser(newUser);
    setIsModalOpen(false);
  };

  //FUNCTIONS TO HANDLE FORM
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  type FieldType = {
    username: string;
    email: string;
    password: string;
  };

  return (
    <>
      {!loggedInUser && (
        <Button type="primary" className="RegisterBtn" onClick={showModal}>
          Register
        </Button>
      )}

      <Modal
        title="Type in your credentials"
        open={isModalOpen}
        onCancel={handleCancel}
        okText="Register"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            className="RegisterBtn"
          >
            Register
          </Button>,
        ]}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username." }]}
          >
            <Input onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email address." },
            ]}
          >
            <Input onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password." }]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
