// const createUser = require("../models/helper/index");
const { v4: uuidv4 } = require("uuid");
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUserById,
} = require("../models/helper");
const ForbiddenError = require("../exceptions/forbiddenError");

const newUser = async (req, res, next) => {
  const id = uuidv4(); // generate id randomly
  // get user data input
  const { firstName, lastName, email, password } = req.body;

  // create user
  // This is used to create regular users
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
  let users = await getAllUsers();
  //Return user nfo
  res.status(200).type("json").send(users);
};

const getUserById = async (req, res, next) => {
  // Get ID fron the URL
  const id = req.params.id;

  // Validate if id is same as ones in the token
  if (req.token.payload.role === "user" && id !== req.token.payload.userId)
    throw new ForbiddenError("Not enough permissions");

  // Get the user with requuested Id
  const user = await getUser(id);

  // we will only hit this line when the user with requested id is found
  res.status(200).type("json").send(user);
};

const editUser = async (req, res, next) => {
  // Get user id from URL
  const id = req.params.id;
  // Validate if id is same as one in the token
  if (id !== req.token.payload.userId)
    throw new ForbiddenError("Not enough permissions");

  // Will include roles to prevent user to assign admin roles

  // Get values from req.body
  const { email } = req.body;

  // Retrieve and update user
  const user = await getUser(id);
  await updateUser(id, email || user.dataValues.email);

  // will hit this line only when the update executes successfully
  //Send HTTP no content resonse
  res.status(204).type("json").send();
};

const deleteUser = async (req, res, next) => {
  //Get user id from URL
  const id = req.params.id;

  //delete user
  await deleteUserById(id);

  // will only hit this line of code when the user is deleted
  res.status(204).type("json").send();
};

module.exports = { newUser, listAll, getUserById, editUser, deleteUser };
