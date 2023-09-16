import { Button, Checkbox, Form, Input } from "antd";
// import UserContext, { UserType } from "../../context/UserContext";
import { useContext, useState } from "react";

export default function LoginForm() {
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");
  //   const { login, loggedInUser } = useContext(UserContext);

  //   const handleLogin = async (e: { preventDefault: () => void }) => {
  //     e.preventDefault();
  //     const user: UserType = {
  //       username,
  //       password,
  //     };

  //     setUsername("");
  //     setPassword("");
  //   };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  return (
    <>
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

        {/* <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={handleLogin}>
            Submit
          </Button>
        </Form.Item> */}
      </Form>
    </>
  );
}
