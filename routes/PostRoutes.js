const express = require("express");

const router = express.Router();

// Services
const ApiAuthService = require("../services/ApiAuth");

// Controllers
const PostController = require("../controller/PostController");

// Validations
const PostValidation = require("../validations/PostValidation");

router.post("/post/createPost", [ApiAuthService.validateToken, PostValidation.createPost], PostController.createPost);
router.get("/post/listPost", ApiAuthService.validateToken, PostController.listPost);

module.exports = router;
