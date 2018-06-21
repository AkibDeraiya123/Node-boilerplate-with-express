/** User Mongo DB model	*/

var mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
 	lastName: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	createdAt: { 
		type: Date, 
		default: new Date()
	},
	updatedAt: {
		type: Date, 
		default: new Date()
	},
});

module.exports = mongoose.model("users", UserSchema);