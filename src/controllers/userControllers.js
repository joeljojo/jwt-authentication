const { createUser } = require("../Models/User");
const { v4: uuidv4 } = require("uuid");

const newUser = async (req, res, next) => {
  const id = uuidv4(); // generate id randomly
  // get user data input
  const { firstname, lastname, email, password } = req.body;

  // create user
  const user = createUser(id, firstname, lastname, email, password);
  res.status(201).json({ message: "User registered successfully", user });
};

module.exports = { newUser };
