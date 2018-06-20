module.exports = {
	createPost: function (req, res, next) {
		req.checkBody('text', 'Post contain text is required').notEmpty();
		
		req.asyncValidationErrors().then(() => {
			next();
		}).catch((errors) => {
			if(errors) {
				return res.json({
					success: false,
					errors: errors[0].msg
				});
			};
		});
	}
}