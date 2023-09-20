import { Button, Modal, Form, Input } from "antd";
import "./LoginBtn.css";
import { useState } from "react";
import { RegisteredUser, useUserContext } from "../../context/UserContext";

export default function LoginBtn() {
  const { loggedInUser, login, logout } = useUserContext();

  //CODE TO OPEN/CLOSE MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // //CODE TO HANDLE FORM

  const onFinish = async (values: any) => {
    const registeredUser: RegisteredUser = {
      username: values.username,
      password: values.password,
    };
    await login(registeredUser);
    setIsModalOpen(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
  };
  return (
    <div>
      {loggedInUser && (
        <Button type="primary" className="LoginBtn" onClick={logout}>
          Logout
        </Button>
      )}
      {!loggedInUser && (
        <Button type="primary" className="LoginBtn" onClick={showModal}>
          Login
        </Button>
      )}

      <Modal
        title="Type in your credentials"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        okText="Login"
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
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="submit-container">
            <Button type="primary" htmlType="submit" className="submitBtn">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
