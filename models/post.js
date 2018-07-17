/** Post Mongo DB model	*/

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
	text: String,
	userID: String,
});

module.exports = mongoose.model("posts", PostSchema);
