import { Button, Modal } from "antd";
import "./LoginBtn.css";
import { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import login from "../../context/UserContext";

export default function LoginBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    login;
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Button type="primary" className="LoginBtn" onClick={showModal}>
        Login/Register
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Login"
      >
        <LoginForm />
      </Modal>
    </div>
  );
}
