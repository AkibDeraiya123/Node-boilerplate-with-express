/** User Mongo DB model	*/

var mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	username: String,
	password: String,
});

module.exports = mongoose.model("users", UserSchema);