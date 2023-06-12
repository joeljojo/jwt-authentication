const express = require("express");
const user = require("./userRoutes");

const routers = express.Router();

// All user operations will be available under the "users" route prefix.
routers.use("/users", user);

module.exports = routers;
