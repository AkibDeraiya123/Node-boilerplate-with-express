const bcrypt = require("bcrypt");
const clc = require("cli-color");

const clcError = clc.red.bold;
const randomstring = require("randomstring");

// Database model
const UserModel = require("../models/user");

// services
const ApiAuthService = require("../services/ApiAuth");
const sendEmail = require("../services/sendEmail");

// constant
const config = require("../config");

module.exports = {
	signup(req, res) {
		const emailHash = randomstring.generate();

		const newUser = new UserModel({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password, 10),
			emailHash,
		});

		newUser.save()
			.then(() => {
			/* Send email verification link on user added email address.
				params:-
					1) user email address
					2) User first name
					3) email verification link
			*/
				sendEmail.seneWelcomeEmail(
					req.body.email,
					req.body.firstName,
					config.emailVerificationLink + emailHash,
				);

				res.status(200).send({
					status: true,
					message: "New user added successfully.",
				});
			})
			.catch((err) => {
				console.log(clcError("err in user signup:- ", err));
				res.status(500).send({
					status: false,
					message: "User not added successfully. Please try again.",
				});
			});
	},
	login(req, res) {
		UserModel.findOne({ username: req.body.username })
			.then(async (data) => {
				if (data) {
					if (bcrypt.compareSync(req.body.password, data.password)) {
						if (!data.emailConfirmation) {
							res.status(401).send({
								status: false,
								message: "Email is not verified.",
							});
						} else {
							res.status(200).send({
								status: true,
								message: "Login successful.",
								token: await ApiAuthService.signIn(JSON.parse(JSON.stringify(data))),
								data,
							});
						}
					} else {
						res.status(400).send({
							status: false,
							message: "Password is not valid.",
						});
					}
				} else {
					res.status(400).send({
						status: false,
						message: "Username is not found.",
					});
				}
			})
			.catch((err) => {
				console.log(clcError("Err while find with email in login:-", err));
				res.status(500).send({
					status: false,
					message: "Something went wrong. Please try again.",
				});
			});
	},
	emailVerification(req, res) {
		UserModel.findOneAndUpdate(
			{ emailHash: req.params.hash, emailConfirmation: false },
			{ emailHash: "", emailConfirmation: true },
		)
			.then((data) => {
				if (data) {
					res.status(200).send({
						status: true,
						message: "Email verified.",
					});
				} else {
					res.status(400).send({
						status: false,
						message: "Invalid email verification link.",
					});
				}
			})
			.catch((err) => {
				console.log(clcError("Err while find with email verification:-", err));
				res.status(500).send({
					status: false,
					message: "Something went wrong. Please try again.",
				});
			});
	},
	resetPassword(req, res) {
		const resetPasswordHash = randomstring.generate();

		UserModel.findOneAndUpdate(
			{ email: req.body.email },
			{ resetPasswordHash },
		)
			.then((data) => {
				console.log("data", data);
				if (data) {
					/* Send email verification link on user added email address.
					params:-
						1) user email address
						2) User first name
						3) email verification link
				*/
					sendEmail.resetPassword(
						data.email,
						data.firstName,
						config.forgotPasswordLink + resetPasswordHash,
					);

					res.status(200).send({
						status: true,
						message: "Plase check your email.",
					});
				} else {
					res.status(400).send({
						status: false,
						message: "Email not found.",
					});
				}
			})
			.catch((err) => {
				console.log(clcError("Err while find with email verification:-", err));
				res.status(500).send({
					status: false,
					message: "Something went wrong. Please try again.",
				});
			});
	},
	updatePassword(req, res) {
		UserModel.findOneAndUpdate(
			{ resetPasswordHash: req.body.hash },
			{ resetPasswordHash: "", password: bcrypt.hashSync(req.body.password, 10) },
		)
			.then((data) => {
				if (data) {
					res.status(200).send({
						status: true,
						message: "Password updated successfully.",
					});
				} else {
					res.status(400).send({
						status: false,
						message: "Invalid link.",
					});
				}
			})
			.catch((err) => {
				console.log(clcError("Err while find with resetPasswordHash:-", err));
				res.status(500).send({
					status: false,
					message: "Something went wrong. Please try again.",
				});
			});
	},
};
