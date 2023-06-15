const express = require("express");
const asyncHandler = require("../middlewares/asyncHandler");
const authController = require("../controllers/authControllers");

const router = express.Router();

// Each handler is wrapped with an error handling function
// Login route
router.post("/login", asyncHandler(authController.login));

module.exports = router;
