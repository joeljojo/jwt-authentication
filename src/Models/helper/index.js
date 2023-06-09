const bcrypt = require("bcrypt");
const db = require("../index");
const ClientError = require("../../exceptions/clientError");
const NotFoundError = require("../../exceptions/notFoundError");
const User = db.user;
const Role = db.role;

// Generate safe copy of users(without password)
const generateSafeCopy = (user) => {
  const _user = { ...user };
  delete _user.dataValues.password;
  return _user;
};

// Get user by email if the user with provided email exists
const getUserByEmail = async (email) => {
  const emailAvailable = await User.findOne({
    where: { email: email },
    include: Role,
  });

  if (!emailAvailable) {
    return undefined;
  } else {
    // get user roles
    const roles = await emailAvailable.getRoles();
    emailAvailable.dataValues.role = roles[0].name;
    return generateSafeCopy(emailAvailable);
  }
};

//Check if password is correct
const isPasswordCorrect = async (email, password) => {
  // we cannot use getUserByEmail()
  // because we need to use a password
  // get getUserByEmail() has generateSafeCopy() which deletes a password from the record
  const user = await User.findOne({ where: { email: email } });
  if (!user.dataValues.email) throw new NotFoundError("User not found");
  return await bcrypt.compare(password, user.dataValues.password);
};

const changePassword = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user.dataValues.email) throw new NotFoundError("User not found");
  password = password.trim();

  // Perform password checks(you may add more checks)
  if (password.length === 0) throw new ClientError("Password required");

  // update user password(ensure you store a hash)
  await User.update(
    { password: bcrypt.hashSync(password, 12) },
    { where: { email: email } }
  );
};

const createUser = async (id, firstName, lastName, email, password) => {
  id.trim();
  firstName.trim();
  lastName.trim();
  email.trim();
  password.trim();

  // ensure the fields are not empty
  if (firstName.length === 0) throw new ClientError("First name is required");
  else if (lastName.length === 0)
    throw new ClientError("Last name is required");
  else if (email.length === 0) throw new ClientError("Email is required");
  else if (password.length === 0) throw new ClientError("Password is required");

  // Check if user exists
  if ((await getUserByEmail(email)) != undefined)
    throw new ClientError("User already exists");

  //Create the user
  const user = await User.create({
    id,
    firstName,
    lastName,
    email,
    password: bcrypt.hashSync(password, 12),
  });

  // Assign role(s) to the user
  const role = await Role.findOne({ where: { name: "user" } });
  await user.setRoles(role);

  return generateSafeCopy(user);
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users.map((user) => generateSafeCopy(user));
};

const getUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user?.dataValues.id) throw new NotFoundError("User not found");
  return generateSafeCopy(user);
};

const updateUser = async (id, email) => {
  // check if user exists
  await getUser(id);

  // Perform validation checks
  if (email.length === 0) throw new ClientError("Invalid input");

  // trim the inputs
  id.trim();
  email.trim();

  // Check if the retrieved user ID is not undefined
  // and if it is different from the current user's ID
  const userIdWithEmail = await getUserByEmail(email)?.email;
  if (userIdWithEmail !== undefined && userIdWithEmail !== id) {
    throw new ClientError("Invalid user");
  }

  // Apply updates
  await User.update({ email: email }, { where: { id: id } });
};

const deleteUserById = async (id) => {
  //Check is user with given id exists
  await getUser(id);
  // if exists delete user
  await User.destroy({ where: { id: id } });
};

module.exports = {
  createUser,
  generateSafeCopy,
  getUserByEmail,
  isPasswordCorrect,
  changePassword,
  getAllUsers,
  getUser,
  updateUser,
  deleteUserById,
};
