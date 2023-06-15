const express = require("express");
const asyncHandler = require("../middlewares/asyncHandler");
const checkJwt = require("../middlewares/checkJwt");
const authController = require("../controllers/authControllers");

const router = express.Router();

// Each handler is wrapped with an error handling function
// Login route
router.post("/login", asyncHandler(authController.login));

//change password route
router.post(
  "/change-password",
  [checkJwt],
  asyncHandler(authController.changeUserPassword)
);

module.exports = router;
