require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.json()); //goes through all post endpoints and transform into right data format

const CLIENT_URL = "http://127.0.0.1:5173";

// Middlewares, important with right order
app.use(
  cors({
    origin: "*",
  })
);

//START STRIPE SESSION
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.map((item) => {
        return {
          price: item.product,
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: "http://localhost:5173/confirmation",
      cancel_url: CLIENT_URL,
    });

    //nu vill vi redirecta till stripe checkout url
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Something went wrong...");
  }
});

app.listen(3000, () => console.log("Server is up and running.."));
