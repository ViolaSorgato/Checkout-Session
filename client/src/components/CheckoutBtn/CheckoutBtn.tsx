import { Button } from "antd";
import "./CheckoutBtn.css";
import { useShoppingCart } from "../../context/CartContext";

export default function CheckoutBtn() {
  const { cartItems } = useShoppingCart();

  async function handlePayment() {
    const itemsToCheckout = cartItems.map((cartItem) => ({
      product: cartItem.id,
      quantity: cartItem.quantity,
    }));
    console.log(itemsToCheckout);
    console.log(cartItems);

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
      <Button className="CheckoutBtn" type="primary" onClick={handlePayment}>
        To checkout
      </Button>
    </div>
  );
}
