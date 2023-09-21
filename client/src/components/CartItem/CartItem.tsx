import { useShoppingCart } from "../../context/CartContext";
import "../CartItem/CartItem.css";
import { Row, Typography, Empty } from "antd";
import CheckoutBtn from "../CheckoutBtn/CheckoutBtn";
const { Title } = Typography;

//SHOWS EITHER EMPTY CART OR LIST OF CART ITEMS
export default function CartItem() {
  const { cartItems } = useShoppingCart();

  return (
    <>
      {cartItems.length === 0 && (
        <div>
          <Empty description={false} />
          <Title level={4}>Your cart is empty.</Title>
        </div>
      )}

      {cartItems.length >= 1 && (
        <Row className="quantity-btn-container">
          <ul style={{ listStyleType: "none" }}>
            {cartItems.map((cartItem, index) => (
              <li key={index} className="shoppingcart--content--listitem">
                <h3>{cartItem.name}</h3>

                <p>
                  {cartItem.quantity} st à {cartItem.price.unit_amount}{" "}
                  <span>{cartItem.price.currency}</span>
                </p>
              </li>
            ))}
            <CheckoutBtn />
          </ul>
        </Row>
      )}
    </>
  );
}
