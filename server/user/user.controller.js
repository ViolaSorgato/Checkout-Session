const { initStripe } = require("../stripe");
const stripe = initStripe();
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const filePath = path.join("db", "users.json");

let usersArray = [];
//DO WE NEED THIS? UNCLEAR
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
  const { email, username, password } = req.body;

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
    res.json({
      Message: "Successfully logged in",
      user: {
        username: user.username,
        email: user.email,
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
    res.status(204).json("Successfully logged out.");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getUsers, registerUser, loginUser, logoutUser };
