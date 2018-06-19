/** User Mongo DB model	*/

var mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: String,
	username: String,
	password: String,
	createdAt: Date,
	updatedAt: Date,
});

const User = mongoose.model("users", UserSchema);