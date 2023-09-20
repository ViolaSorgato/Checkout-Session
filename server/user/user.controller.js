const { initStripe } = require("../stripe");
const stripe = initStripe();
const bcrypt = require("bcrypt");
const { log } = require("console");
const fs = require("fs");
const path = require("path");
const filePath = path.join("db", "users.json");

let usersArray = [];
//GET ALL USERS
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

//AUTHORIZATION
async function authorization(req, res) {
  if (!req.session.id) {
    return res.status(401).json("You are not logged in");
  }

  return req.session, res.status(200).json(req.session);
}

//REGISTER NEW USER AND ADD IT TO THE JSON FILE
async function registerUser(req, res) {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  //ARRAY OF USERS

  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    usersArray = JSON.parse(fileData);
  } catch (err) {
    console.log(err);
  }

  //CHECK IF USER ALREADY EXISTS
  const existingUser = usersArray.find(
    (user) => user.username === username || user.email === email
  );
  if (existingUser) {
    return res.status(400).json({ Message: "User already exists" });
  }

  //CREATE CUSTOMER IN STRIPE
  try {
    const user = await stripe.customers.create({
      email: email,
      name: username,
    });

    //COMBINE OUR USER WITH STRIPE CUSTOMER TO ADD ID
    const newUser = {
      id: user.id,
      username,
      password: hashedPassword,
      email: user.email,
    };

    //PUSH INTO ARRAY & HANDLE ERROR
    usersArray.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(usersArray, null, 2));
    res.json({ newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//LOGIN
async function loginUser(req, res) {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    usersArray = JSON.parse(fileData);
    const user = usersArray.find((user) => user.username === username);

    if (!user) {
      return res.status(401).json("Wrong username or password");
    }
    const passwordOk = await bcrypt.compare(password, user.password);

    if (!passwordOk) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }

    delete user.password;
    req.session = user;
    res.status(200).json({
      Message: "Successfully logged in",
      user: {
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//LOGOUT
async function logoutUser(req, res) {
  try {
    req.session = null;
    res.status(200).json("Successfully logged out.");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getUsers,
  authorization,
  registerUser,
  loginUser,
  logoutUser,
};
