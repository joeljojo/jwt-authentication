const bcrypt = require("bcrypt");
const db = require("../index");
const ClientError = require("../../exceptions/clientError");
const User = db.user;
// Generate safe copy of users(without password)
const generateSafeCopy = (user) => {
  const _user = { ...user };
  delete _user.password;
  return _user;
};

// Get user by email if the user with provided email exists
const getUserByEmail = async (email) => {
  const availableEmails = await User.findOne({ where: { email: email } });

  if (availableEmails.length === 0) return undefined;
  return generateSafeCopy(availableEmails[0]);
};
const createUser = async (id, firstname, lastname, email, password) => {
  id.trim();
  firstname.trim();
  lastname.trim();
  email.trim();
  password.trim();

  // ensure the fields are not empty
  if (firstname.length === 0) throw new ClientError("First name is required");
  else if (lastname.length === 0)
    throw new ClientError("Last name is required");
  else if (email.length === 0) throw new ClientError("Email is required");
  else if (password.length === 0) throw new ClientError("Password is required");

  // Check if user exists
  if (getUserByEmail(email) != undefined)
    throw new ClientError("User already exists");

  //Create the user

  const user = await User.create({
    id,
    firstname,
    lastname,
    email,
    password: bcrypt.hashSync(password, 12),
  });
  return generateSafeCopy(user);
};

module.exports = { createUser, generateSafeCopy };
