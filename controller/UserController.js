const UserModel = require('../models/user');

module.exports = {
	signup: function (req, res) {
		const newUser = new UserModel({
			firstName: req.body.firstName,
			lastName: req.body.lastName,	
			username: req.body.username,
			// password: req.body.password,
		});
		
		newUser.save().then((data) => {
			console.log("data", data);
		})
		.catch((err) => {
			console.log("err", err);
		})
	},
	login: function (req, res) {
	},
}