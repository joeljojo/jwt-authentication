// const createUser = require("../models/helper/index");
const { v4: uuidv4 } = require("uuid");
const { createUser } = require("../models/helper");

const newUser = async (req, res, next) => {
  const id = uuidv4(); // generate id randomly
  // get user data input
  const { firstName, lastName, email, password } = req.body;

  // create user
  const user = createUser(id, firstName, lastName, email, password);

  res.status(201).json({ message: "User registered successfully", user: user });
};

module.exports = { newUser };
