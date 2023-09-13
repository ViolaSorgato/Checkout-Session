const { initStripe } = require("../stripe");
const stripe = initStripe();
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const filePath = path.join("db", "users.json");

async function getUsers(req, res) {
  try {
    const users = await stripe.customers.list({
      limit: 3,
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function registerUser(req, res) {
  const { username, password, email } = req.body;
  //hash password
  const hashedPassword = await bcrypt.hash(password, 8);

  //array of users
  let usersArray = [];
  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    usersArray = JSON.parse(fileData);
  } catch (err) {
    console.log(err);
  }
  //check if users exists
  const existingUser = usersArray.find(
    (user) => user.username === username || user.email === email
  );
  if (existingUser) {
    return res.status(400).json({ Message: "User already exists" });
  }

  //register customer in skype
  try {
    const user = await stripe.customers.create({
      email: email,
      name: username,
    });

    //newUser object
    const newUser = {
      id: user.id,
      username,
      password: hashedPassword,
      email: user.email,
    };

    usersArray.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(usersArray, null, 2));
    res.json({ newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//LOGIN
async function loginUser(req, res) {
  try {
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function logoutUser(req, res) {
  try {
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getUsers, registerUser, loginUser, logoutUser };
