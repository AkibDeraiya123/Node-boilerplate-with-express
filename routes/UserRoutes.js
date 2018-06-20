const express = require("express");
const router = express.Router();
const ApiAuthService = require("../services/ApiAuth");

// Controllers
const UserController = require('../controller/UserController');

//Validations
const UserValidation = require('../validations/UserValidations');

router.post("/signup", UserValidation.signup, UserController.signup);
router.post("/login", UserValidation.login, UserController.login);

module.exports = router;
