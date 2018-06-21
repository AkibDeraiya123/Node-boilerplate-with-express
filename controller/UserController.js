const bcrypt = require('bcrypt');
const clc = require('cli-color');
const clcError = clc.red.bold;

// Database model
const UserModel = require('../models/user');

// services
const ApiAuthService = require("../services/ApiAuth");

module.exports = {
	signup: function (req, res) {
		const newUser = new UserModel({
			firstName: req.body.firstName,
			lastName: req.body.lastName,	
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password, 10),
		});
		
		newUser.save().then((data) => {
			res.status(200).send({
				status: true,
				message: "New user added successfully."
			});
		})
		.catch((err) => {
			console.log(clcError("err in user signup:- ", err));
			res.status(500).send({
				status: false,
				message: "User not added successfully. Please try again."
			});
		})
	},
	login: function (req, res) {
		UserModel.findOne({ username: req.body.username }).then( async (data) => {
			if(data) {
				if(bcrypt.compareSync(req.body.password, data.password)) {
					res.status(200).send({
						status: true,
						message: "Login successful.",
						token: await ApiAuthService.signIn(JSON.parse(JSON.stringify(data))),
						data
					});
				} else {
					res.status(400).send({
						status: false,
						message: "Password is not valid."
					});
				}
			} else {
				res.status(400).send({
					status: false,
					message: "Username is not found."
				});	
			}
		})
		.catch((err) => {
			console.log(clcError("Err while find with email in login:-", err));
			res.status(500).send({
				status: false,
				message: "Something went wrong. Please try again."
			});
		})
	},
}