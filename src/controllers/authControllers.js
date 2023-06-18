const jwt = require("jsonwebtoken");
const ClientError = require("../exceptions/clientError");
const {
  getUserByEmail,
  isPasswordCorrect,
  changePassword,
} = require("../models/helper/index");
const UnauthorizedError = require("../exceptions/unauthorizedError");
const config = require("../config");

const login = async (req, res, next) => {
  //Ensure email and password is provided
  //Throw an exception if the values are missing
  const { email, password } = req.body;
  if (!(email && password))
    throw new ClientError("Email and password are required");

  //Get user by provided email
  const user = await getUserByEmail(email);
  //Check if the password matches
  if (!user || !(await isPasswordCorrect(user.dataValues.email, password)))
    throw new UnauthorizedError("Invalid email or password");

  //Generate and sign jwt token
  //For simplicity let's expound the user's properties
  const token = jwt.sign(
    {
      userId: user.dataValues.id,
      firstName: user.dataValues.firstName,
      lastName: user.dataValues.lastName,
      email: user.dataValues.email,
      role: user.dataValues.role,
    },
    config.jwt.secret,
    {
      expiresIn: "1h",
      notBefore: "0", // Cannot use before now
      algorithm: "HS256",
    }
  );

  // This line of code shall not be hit when an error occurs
  // return token in response
  res
    .status(200)
    .type("json")
    .send({ message: "Login Successfully", token: token });
};

const changeUserPassword = async (req, res, next) => {
  // Get email from incomming token
  const email = req.token.payload.email;
  //Get passwords provided from req.body
  const { oldPassword, newPassword } = req.body;
  // ensure they are not empty
  if (!(oldPassword && newPassword))
    throw new ClientError("New and old passwords required");

  //check if old password matches the currently stored password
  // if mismatch throw an error to client
  if (!(await isPasswordCorrect(email, oldPassword)))
    throw new UnauthorizedError("Old password does not match");

  // Update user password
  // will not hit this code if old password doesn't match stored password
  await changePassword(email, newPassword);
  res
    .status(200)
    .type("json")
    .send({ message: "Password updated successfully" });
};

module.exports = { login, changeUserPassword };
