import { Button, Drawer, Space } from "antd";
import { ShoppingTwoTone } from "@ant-design/icons";
import Logo from "../../assets/Logo.png";
import LoginBtn from "../Login/LoginBtn";
import "./Header.css";
import { useState } from "react";
// import CheckoutBtn from "../CheckoutBtn/CheckoutBtn";
import CartItem from "../CartItem/CartItem";
import RegisterBtn from "../Register/RegisterBtn";

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

      <div className="BtnNav">
        <RegisterBtn />
        <LoginBtn />
        <ShoppingTwoTone
          className="ShoppincartIcon"
          twoToneColor="#7E66F9"
          onClick={showDrawer}
        ></ShoppingTwoTone>
        <Drawer
          title="Your Shopping Cart"
          width={500}
          onClose={onClose}
          open={open}
          extra={
            <Space>
              <Button onClick={onClose}>Close</Button>
            </Space>
          }
        >
          <div>
            <CartItem />
          </div>

          {/* <CheckoutBtn /> */}
        </Drawer>
      </div>
    </nav>
  );
}
