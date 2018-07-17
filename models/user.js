/** User Mongo DB model	*/

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	emailHash: { type: String, required: true },
	emailConfirmation: { type: Boolean, default: false },
	resetPasswordHash: { type: String },
	createdAt: {
		type: Date,
		default: new Date(),
	},
	updatedAt: {
		type: Date,
		default: new Date(),
	},
});

module.exports = mongoose.model("users", UserSchema);
