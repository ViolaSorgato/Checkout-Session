import { Button, Typography } from "antd";
import "./CheckoutBtn.css";
import { useShoppingCart } from "../../context/CartContext";
import { useUserContext } from "../../context/UserContext";
const { Text } = Typography;

//SHOWS EITHER CHECKOUT BUTTON OR WARNING MESSAGE, DEPENDING WHETHER LOGGEDIN OR NOT
//CALLS HANDLEPAYMENT FUNCTION
export default function CheckoutBtn() {
  const { cartItems } = useShoppingCart();
  const { loggedInUser } = useUserContext();

  async function handlePayment() {
    const itemsToCheckout = cartItems.map((cartItem) => ({
      product: cartItem.id,
      quantity: cartItem.quantity,
    }));

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: itemsToCheckout }),
    });

    if (!response.ok) {
      return;
    }

    const { url } = await response.json();
    window.location = url;
  }
  return (
    <div>
      {loggedInUser && (
        <Button className="CheckoutBtn" type="primary" onClick={handlePayment}>
          To checkout
        </Button>
      )}
      {!loggedInUser && (
        <Text type="danger">Please log in to proceed to checkout.</Text>
      )}
    </div>
  );
}
