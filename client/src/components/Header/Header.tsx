import { Button } from "antd";
import { Layout, Space } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Logo from "../../assets/Logo.png";

export default function Header() {
  return (
    <>
      <img src={Logo} alt="Logo" />
      <Button type="primary">Login</Button>
      <ShoppingCartOutlined />
    </>
  );
}
