import { useShoppingCart } from "../../context/CartContext";
// import { Price, useProductContext } from "../../context/ProductContext";
import "../CartItem/CartItem.css";
import { Row } from "antd";

export default function CartItem() {
  // const { products } = useProductContext();
  const { cartItems } = useShoppingCart();

  // const item = products.find((i) => i.id === product);
  // if (item === null) return null;

  return (
    <>
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
        </ul>
      </Row>
    </>
  );
}
