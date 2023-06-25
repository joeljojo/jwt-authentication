const express = require("express");
const { getUserByEmail } = require("../models/helper");

const checkRoles = (roles) => {
  return async (req, res, next) => {
    // find email from token
    const email = req.token.payload.email;

    // retrieve user with the above id
    const user = await getUserByEmail(email);

    if (!user) {
      res.status(404).type("json").send({ message: "User not found" });
      return;
    }

    //check if array of roles includes user's roles
    if (roles.indexOf(user.dataValues.role) > -1) {
      next();
    } else {
      res.status(403).type("json").send({ message: "Not enough permissions" });
      return;
    }
  };
};

module.exports = checkRoles;
