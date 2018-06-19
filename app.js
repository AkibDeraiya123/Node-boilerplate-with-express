// Readymade modules
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const expressValidator = require('express-validator');

// Created Modules
var Database = require('./DB/database');

// Load dotenv config
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  require('dotenv').load();

  if (!process.env.PORT) {
    console.error('Required environment variable not found. Are you sure you have a ".env" file in your application root?');
    console.error('If not, you can just copy "example.env" and change the defaults as per your need.');
    process.exit(1);
  }
}

const app = express();
const server = http.createServer(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(express.bodyParser({uploadDir:'/public/images/profile/'}));
app.use(expressSession({
    secret: config.cypherKey,
    resave: true,
    cookie: {
      sameSite:true,
    }
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API routes initialise
require('./routes/index')(app);

// Catch 404 errors
// Forwarded to the error handlers
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler
// Displays stacktrace to the user
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// Production error handler
// Does not display stacktrace to the user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: '',
  });
});


// db configuration
Database.config(
  config && config.mongodb && config.mongodb.address ? config.mongodb.address : '',
  config && config.mongodb && config.mongodb.dbName ? config.mongodb.dbName : 'kryptonight',
  config && config.mongodb && config.mongodb.options ? config.mongodb.options : undefined,
  function(err, message) {
    if (!err)
      console.info('Mongodb is connected');
    else
      console.error('Mongodb Error:' + message);
  }
);

server.listen(process.env.PORT);
console.log(`Server started on port ${process.env.PORT}`);
module.exports = app;
