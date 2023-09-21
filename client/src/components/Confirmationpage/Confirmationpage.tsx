import "./Confirmationpage.css";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export default function Confirmationpage() {
  return (
    <Result
      status="success"
      title="Hurray! We have received your payment!"
      subTitle="Your order is being processed."
      extra={[
        <Link to="/">
          <Button type="primary" className="buy-more-btn">
            Buy some more
          </Button>
        </Link>,
      ]}
    />
  );
}
