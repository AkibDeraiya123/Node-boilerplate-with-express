module.exports = {
	signup: function (req, res, next) {
		req.checkBody('firstName', 'Firstname is required').trim().notEmpty();
		req.checkBody('lastName', 'Lastname is required').trim().notEmpty();
		req.checkBody('username', 'Username is required').trim().notEmpty(); 
		req.checkBody('username', 'Username must be 6 to 15 length').trim().len(6, 15);
		req.checkBody('password', 'Password is required').trim().notEmpty();
		req.checkBody('password', 'Password must be 8 to 20 length').trim().len(8, 20);
		
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
		req.checkBody('username', 'Username is required').trim().notEmpty(); 
		req.checkBody('password', 'Password is required').trim().notEmpty();
		
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