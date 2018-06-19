const express = require("express");
const router = express.Router();
const ApiAuthService = require("../services/ApiAuth");

// Controllers
const UserController = require('../controller/UserController');

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);

module.exports = router;
