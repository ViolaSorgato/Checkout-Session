const express = require("express");
const {
  getUsers,
  authorization,
  registerUser,
  loginUser,
  logoutUser,
} = require("./user.controller");
const userRouter = express
  .Router()

  .get("/users", getUsers)
  .get("/users/authorize", authorization)
  .post("/users/register", registerUser)
  .post("/users/login", loginUser)
  .post("/users/logout", logoutUser);

module.exports = { userRouter };
