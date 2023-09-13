const express = require("express");
const {
  getUsers,
  registerUser,
  loginUser,
  logoutUser,
} = require("./user.controller");
const userRouter = express
  .Router()

  .get("/users", getUsers)
  .post("/users/register", registerUser)
  .post("/users/login", loginUser)
  .post("/users/logout", logoutUser);

module.exports = { userRouter };
