const express = require("express");
const asyncHandler = require("../middlewares/asyncHandler");
const UserController = require("../controllers/userControllers");
const checkJwt = require("../middlewares/checkJwt");
const checkRole = require("../middlewares/checkRole");

const router = express.Router();

// Each handler is wrapped with an error handling function
router.post("/", asyncHandler(UserController.newUser));

//Get all users
router.get(
  "/",
  [checkJwt, checkRole(["admin"])],
  asyncHandler(UserController.listAll)
);

// Get user by id
router.get(
  "/:id",
  [checkJwt, checkRole(["user", "admin"])],
  asyncHandler(UserController.getUserById)
);

//update user
router.patch(
  "/:id",
  [checkJwt, checkRole(["user", "admin"])],
  asyncHandler(UserController.editUser)
);

// delete user
router.delete(
  "/:id",
  [checkJwt, checkRole(["admin"])],
  asyncHandler(UserController.deleteUser)
);

module.exports = router;
