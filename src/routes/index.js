const express = require("express");
const user = require("./userRoutes");
const auth = require("./authRoutes");

const routes = express.Router();

// All user operations will be available under the "users" route prefix.
routes.use("/users", user);

// All auth operations will be available under the "auth" route prefix.
routes.use("/auth", auth);

module.exports = routes;
