const nodemailer = require('nodemailer');
const mailerhbs = require('nodemailer-express-handlebars');

// Case:- 1) You can use nodemailer-ses-transport and add aws creadentils
// const ses = require('nodemailer-ses-transport');
// const transporter = nodemailer.createTransport(ses({
//     accessKeyId: process.env.AWSKEY,
//     secretAccessKey: process.env.AWSSECRET,
//     region: process.env.AWSREGION
// }));

// Case:- 2) you can use your own gmail creadentials
// const smtpTransport = require('nodemailer-smtp-transport');
// const transporter = nodemailer.createTransport(smtpTransport({
// 	service: 'Gmail',
// 	auth: {
// 		user: process.env.EMAIL,
// 		pass: process.env.PASSWORD
// 	}
// }));

// Case:- 3) You can use your own smtp creadentials
const transporter = nodemailer.createTransport({
	host: process.env.HOST,
	port: process.env.SMTPPORT,
	secure: process.env.SECURE,
	auth: {
		user: process.env.SMTPUSERNAME,
		pass: process.env.PASSWORD
	},
});

transporter.use('compile', mailerhbs({
    viewPath: 'emailTemplate', //Path to email template folder
    extName: '.hbs' //extendtion of email template
}));

module.exports = {
	seneWelcomeEmail: function(to, name, link) {
		const params = {
			from: process.env.WELCOMEEMAIL,
			to,
			subject: `Welcome to ${process.env.SITENAME} Confirm your email`,
            template: 'welcome', //Name email file template
          	context: { // pass variables to template
          		name,
          		email: to,
          		link
          	}
        };

        transporter.sendMail(params, function (error, response) {
	        //Email not sent
	        if (error) {
	         	console.log(error);
	         	console.log('Email not sent');
	        } else {
	         	console.log('Success sending email');
	        }
	    });	
    },
    resetPassword: function(to, name, link) {
		const params = {
			from: process.env.WELCOMEEMAIL,
			to,
			subject: `Reset password - ${process.env.SITENAME}`,
            template: 'resetPassword', //Name email file template
          	context: { // pass variables to template
          		name,
          		email: to,
          		link
          	}
        };

        transporter.sendMail(params, function (error, response) {
	        //Email not sent
	        if (error) {
	         	console.log(error);
	         	console.log('Email not sent');
	        } else {
	         	console.log('Success sending email');
	        }
	    });	
    },
}