require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const { checkoutRouter } = require("./checkout/checkout.router");
const { productRouter } = require("./product/product.router");
const { userRouter } = require("./user/user.router");
const app = express();
app.use(express.json()); //goes through all post endpoints and transform into right data format
app.use(bodyParser.json());

// Middlewares, important with right order
app.use(
  cors({
    origin: "*",
  })
);
const secretKey = process.env.COOKIE_SECRET_KEY;
app.use(
  cookieSession({
    name: "COOKIE",
    keys: [secretKey],
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: "strict",
    httpOnly: true,
    secure: false,
  })
);

app.use("/api", checkoutRouter);
app.use("/api", productRouter);
app.use("/api", userRouter);

app.listen(3000, () => console.log("Server is up and running.."));
