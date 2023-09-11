import { Button } from "antd";
import { ShoppingTwoTone } from "@ant-design/icons";
import Logo from "../../assets/Logo.png";
import "./Header.css";

export default function Header() {
  return (
    <nav>
      <div className="LogoNav">
        <img src={Logo} alt="Logo" />
      </div>

      <div className="BtnNav">
        <Button type="primary" className="LoginBtn">
          Login
        </Button>
        <ShoppingTwoTone className="ShoppincartIcon" twoToneColor="#7E66F9" />
      </div>
    </nav>
  );
}
