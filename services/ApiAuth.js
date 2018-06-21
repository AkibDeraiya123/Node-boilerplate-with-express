const jwt  = require('jsonwebtoken');

module.exports = {
	signIn: async function(userData) {
		return await jwt.sign(userData, process.env.cypherKey, {
			expiresIn: process.env.TOKENEXPIRETIME
		})
	},

	validateToken: async function (req, res, next) {
		const { authorization } = req.headers;
		new Promise( async (resolve, reject) => {
			if (authorization && authorization != '') {
				jwt.verify(authorization, process.env.cypherKey, function(err, decoded) {
					if (err) {
						resolve({ 
							status:false,
							message: 'Failed to authenticate token.'
						});
					} else {
						resolve({ 
							status:true, 
							user: decoded
						});
					}
				});

			} else {
				resolve({
					status:false, 
					message:'Authorization token must be required!'
				});
			}
		}).then(({status,message, user}) => {
			req['user'] = (status) ? user : null;
			(status) ? next() : res.json({ status, message });
		});
	}
}
