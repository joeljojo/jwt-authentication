// const createUser = require("../models/helper/index");
const { v4: uuidv4 } = require("uuid");
const { createUser, getAllUSers } = require("../models/helper");

const newUser = async (req, res, next) => {
  const id = uuidv4(); // generate id randomly
  // get user data input
  const { firstName, lastName, email, password } = req.body;

  // create user
  const user = await createUser(id, firstName, lastName, email, password);

  // NOTE: We will only get here if all new user information
  // is valid and the user was created.
  // Send an HTTP "Created" response.
  res.status(201).type("json").send({
    message: "User registered successfully",
    user: user,
  });
};

const listAll = async (req, res, next) => {
  let users = await getAllUSers();
  //Return user nfo
  res.status(200).type("json").send(users);
};
module.exports = { newUser, listAll };
