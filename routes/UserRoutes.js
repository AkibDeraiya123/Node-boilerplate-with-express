const express = require("express");

const router = express.Router();

// Controllers
const UserController = require("../controller/UserController");

// Validations
const UserValidation = require("../validations/UserValidations");

router.post("/signup", UserValidation.signup, UserController.signup);
router.post("/login", UserValidation.login, UserController.login);
router.get("/email-verify/:hash", UserController.emailVerification);
router.post("/reset-password", UserValidation.resetPassword, UserController.resetPassword);
router.post("/updatePassword", UserValidation.updatePassword, UserController.updatePassword);

module.exports = router;
