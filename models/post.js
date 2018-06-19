/** Post Mongo DB model	*/

var mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
	text: String,
	userID: String
});

const Post = mongoose.model("posts", PostSchema);