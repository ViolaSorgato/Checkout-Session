import { useState } from "react";
import "./RegisterBtn.css";
import { Button, Modal, Form, Input } from "antd";

export default function RegisterBtn() {
  //FUNCTIONS TO OPEN/CLOSE MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
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
    username?: string;
    email?: string;
    password?: string;
  };

  return (
    <>
      <Button type="primary" className="RegisterBtn" onClick={showModal}>
        Register
      </Button>
      <Modal
        title="Type in your credentials"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Register"
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
            rules={[{ required: true, message: "Please input your username." }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            rules={[
              { required: true, message: "Please input your email adress." },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Password"
            rules={[{ required: true, message: "Please input your password." }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
