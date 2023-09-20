import { useShoppingCart } from "../../context/CartContext";
import "../CartItem/CartItem.css";
import { Row, Typography, Empty, Divider } from "antd";
import CheckoutBtn from "../CheckoutBtn/CheckoutBtn";
const { Title } = Typography;

export default function CartItem() {
  const { cartItems } = useShoppingCart();

  return (
    <>
      {cartItems.length === 0 && (
        <div>
          <Empty description={false} />
          <Title level={4}>OBS! Your cart is empty.</Title>
        </div>
      )}

      <Row className="quantity-btn-container">
        <ul>
          {cartItems.map((cartItem, index) => (
            <li key={index} className="shoppingcart--content--listitem">
              <h3>{cartItem.name}</h3>

              <p>
                {cartItem.quantity} st à {cartItem.price.unit_amount}{" "}
                <span>{cartItem.price.currency}</span>
              </p>
            </li>
          ))}
          <Divider />
          <CheckoutBtn />
        </ul>
      </Row>
    </>
  );
}
