import { Button, Drawer, Space } from "antd";
import { ShoppingTwoTone } from "@ant-design/icons";
import Logo from "../../assets/Logo.png";
import LoginBtn from "../LoginBtn/LoginBtn";
import "./Header.css";
import { useState } from "react";
import CheckoutBtn from "../CheckoutBtn/CheckoutBtn";

export default function Header() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <nav>
      <div className="LogoNav">
        <img src={Logo} alt="Logo" />
      </div>

      <div className="logindiv">
        <LoginBtn />
      </div>
      <div className="icondiv">
        <ShoppingTwoTone
          className="ShoppincartIcon"
          twoToneColor="#7E66F9"
          onClick={showDrawer}
        ></ShoppingTwoTone>
        <Drawer
          title="Your cart"
          width={500}
          onClose={onClose}
          open={open}
          extra={
            <Space>
              <Button onClick={onClose}>Close</Button>
            </Space>
          }
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <CheckoutBtn />
        </Drawer>
      </div>
    </nav>
  );
}
