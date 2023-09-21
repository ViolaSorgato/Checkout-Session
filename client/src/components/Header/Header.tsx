import { Button, Drawer, Space, Badge } from "antd";
import { ShoppingTwoTone } from "@ant-design/icons";
import Logo from "../../assets/Logo.png";
import LoginBtn from "../Login/LoginBtn";
import "./Header.css";
import { useState } from "react";
import CartItem from "../CartItem/CartItem";
import RegisterBtn from "../Register/RegisterBtn";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../../context/CartContext";

//HANDLES HEADER AND DRAWER FOR SHOPPING CART
//THE CART CONTENT IS IN CARTITEM.TSX
export default function Header() {
  const [open, setOpen] = useState(false);
  const { cartItems } = useShoppingCart();

  //CALCULATE CART QUANTITY FOR BADGE ON CART ICON
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  //OPEN AND CLOSE DRAWER
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <nav>
      <div className="LogoNav">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>

      <div className="BtnNav">
        <RegisterBtn />
        <LoginBtn />
        <Badge count={totalQuantity} color="pink">
          <ShoppingTwoTone
            className="ShoppincartIcon"
            twoToneColor="#7E66F9"
            onClick={showDrawer}
          ></ShoppingTwoTone>
        </Badge>

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
        </Drawer>
      </div>
    </nav>
  );
}
