const express = require("express");
const config = require("./config");
const db = require("./models");
require("dotenv").config();
const routes = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

// instatntiate express object.
const app = express();

const Role = db.role;
app.use(express.json());

//database
db.sequelize.sync({ force: false }).then(() => {
  // define default roles
  createRoles();
});

// Date() without any parameter returns same result as Date.now()
const date = new Date(Date());
// Add routes object before app.listen call
app.use("/" + "api", routes);

// Add errorHandling middleware just before the app.listen call
// this will ensure that all errors are handled
app.use(errorHandler);
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port} at ${date.toString()}`);
});

const createRoles = async () => {
  const roles = [
    { id: 1, name: "user" },
    { id: 2, name: "admin" },
  ];

  // Check if Roles table has records
  // this ensures that we do not create default Roles every time server starts
  const existingRoles = await Role.findAll();
  if (!existingRoles) {
    roles.forEach((role) => Role.create(role));
  }
};
