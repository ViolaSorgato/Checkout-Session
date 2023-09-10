import { useState } from "react";

function Homepage() {
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
    <>
      <div>Homepage</div>
      <button onClick={handlePayment}>To checkout</button>
    </>
  );
}

export default Homepage;
