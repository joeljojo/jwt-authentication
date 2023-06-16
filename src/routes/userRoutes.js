const express = require("express");
const asyncHandler = require("../middlewares/asyncHandler");
const UserController = require("../controllers/userControllers");
const checkJwt = require("../middlewares/checkJwt");

const router = express.Router();

// Each handler is wrapped with an error handling function
router.post("/", asyncHandler(UserController.newUser));

//Get all users
router.get("/", [checkJwt], asyncHandler(UserController.listAll));

// Get user by id
router.get("/:id", [checkJwt], asyncHandler(UserController.getUserById));

module.exports = router;
