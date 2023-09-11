import { Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
export default function Header() {
  return (
    <>
      {/* <img src={Logo} alt="Logo" /> */}
      <Button type="primary">Login</Button>
      <ShoppingCartOutlined />
    </>
  );
}
