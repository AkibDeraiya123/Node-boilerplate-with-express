const jwt = require("jsonwebtoken");

module.exports.signIn = async userData => jwt.sign(
	userData,
	process.env.CYPHERKEY,
	{
		expiresIn: process.env.TOKENEXPIRETIME,
	},
);

module.exports.validateToken = async (req, res, next) => {
	const { authorization } = req.headers;
	new Promise(async (resolve, reject) => {
		if (authorization && authorization !== "") {
			jwt.verify(authorization, process.env.cypherKey, (err, decoded) => {
				if (err) {
					resolve({
						status: false,
						message: "Failed to authenticate token.",
					});
				} else {
					resolve({
						status: true,
						user: decoded,
					});
				}
			});
		} else {
			resolve({
				status: false,
				message: "Authorization token must be required!",
			});
		}
	}).then(({ status, message, user }) => {
		req.user = (status) ? user : null;
		// no-unused-expressions
		(status) ? next() : res.json({ status, message });
	});
};
