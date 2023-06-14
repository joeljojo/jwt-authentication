// const createUser = require("../models/helper/index");
const { v4: uuidv4 } = require("uuid");
const { createUser } = require("../models/helper");

const newUser = async (req, res, next) => {
  const id = uuidv4(); // generate id randomly
  // get user data input
  const { firstName, lastName, email, password } = req.body;

  // create user
  const user = await createUser(id, firstName, lastName, email, password);

  // NOTE: We will only get here if all new user information
  // is valid and the user was created.
  // Send an HTTP "Created" response.
  res.status(201).json({ message: "User registered successfully", user: user });
};

module.exports = { newUser };
