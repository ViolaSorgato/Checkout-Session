import { Button } from "antd";
import ProductList from "../ProductList/ProductList";
import { useState } from "react";
import "./MainContent.css";

function MainContent() {
  // example of hardcoded cart
  const [cart, setCart] = useState([
    {
      product: "price_1NnhEZBAKZ3Nd1eYdvslLfvd",
      quantity: 2,
    },
    {
      product: "price_1Nnh6YBAKZ3Nd1eYY6dtbsNm",
      quantity: 1,
    },
  ]);

  async function handlePayment() {
    const response = await fetch(
      "http://localhost:3000/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      }
    );

    if (!response.ok) {
      return;
    }

    const { url } = await response.json();
    window.location = url;
  }
  return (
    <div className="container">
      <ProductList />
      <Button className="CheckoutBtn" type="primary" onClick={handlePayment}>
        To checkout
      </Button>
    </div>
  );
}

export default MainContent;
