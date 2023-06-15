const ClientError = require("../exceptions/clientError");
const { getUserByEmail, isPasswordCorrect } = require("../models/helper/index");
const UnauthorizedError = require("../exceptions/unauthorizedError");

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
  res.status(200).json({ message: "Login Successfully" });
};

module.exports = { login };
