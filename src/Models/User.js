const { DataTypes } = require("sequelize");
const User = (sequelize, Sequelize) => {
  // Creating user Model
  const UserModel = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true, // allow false deletion
    }
  );
  return UserModel;
};

// Generate safe copy of users(without password)
const generateSafeCopy = (user) => {
  const _user = { ...user };
  delete _user.password;
  return _user;
};

// Get user by email
// const getUserByEmail =
const createUser = async (id, firstname, lastname, email, password) => {
  id.trim();
  firstname.trim();
  lastname.trim();
  email.trim();
  password.trim();

  // ensure the fields are not empty
  if (firstname.length === 0) throw new ClientError("First name is rewuired");
  else if (lastname.length === 0)
    throw new ClientError("Last name is rewuired");
  else if (email.length === 0) throw new ClientError("Email is rewuired");
  else if (password.length === 0) throw new ClientError("Password is rewuired");

  // Check if user exists
  if (getUserByEmail(email) != undefined)
    throw new ClientError("User already exists");

  //Create the user

  const user = await UserModel.create({
    id,
    firstname,
    lastname,
    email,
    password: bcrypt.hashSync(password, 12),
  });

  return generateSafeCopy(user);
};

module.exports = { User, createUser, generateSafeCopy };
