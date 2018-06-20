module.exports = {
	signup: function (req, res, next) {
		req.checkBody('firstName', 'Firstname is required').notEmpty();
		req.checkBody('lastName', 'Lastname is required').notEmpty();
		req.checkBody('username', 'Username is required').notEmpty(); 
		req.checkBody('username', 'Username must be 6 to 15 length').len(6, 15);
		req.checkBody('password', 'Password is required').notEmpty();
		req.checkBody('password', 'Password must be 8 to 20 length').len(8, 20);
		
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
	},
	login: function (req, res, next) {
		req.checkBody('username', 'Username is required').notEmpty(); 
		req.checkBody('password', 'Password is required').notEmpty();
		
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
	},
}