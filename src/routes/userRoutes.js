const express = require("express");
const asyncHandler = require("../middlewares/asyncHandler");
const UserController = require("../controllers/userControllers");

const router = express.Router();

// Each handler is wrapped with an error handling function
router.post("/", asyncHandler(UserController.newUser));

module.exports = router;
