'use strict';

var express = require('express');
/* An object modeling tool for MongoDB. It sits on top of the database
and provides additional querying and validaiton support for the database. */
var mongoose = require('mongoose');
var routes = require('./app/routes/index.js');
// Authentication tool
var passport = require('passport');
// Middleware to connect express to browser sessions
var session = require('express-session');

var app = express();
// Immediatly loads .env variables and passport authentication setup
require('dotenv').load();
require('./app/config/passport')(passport);

// Mongoose connection function
mongoose.connect(process.env.MONGO_URI);

// Allow use of serving static files to html: public views, client controllers, client commons
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/common', express.static(process.cwd() + '/app/common'));

// Configure session information
app.use(session({
	secret: 'secretClementine', // session secret, like a password to prevent hacking
	resave: false, // tells Express if you want to re-save the session to storage even when it has not been modified, default false
	saveUninitialized: true // will force a new session to be created and stored, default true
}));

// Required to start-up password
app.use(passport.initialize());
// Required to connect passport to session storage
app.use(passport.session());

routes(app, passport);

app.listen(3000, function () {
   console.log('Node.js listening on port 3000...');
});


/*
FOLDER STRUCTURE:

+-- Project Folder => The project directory.
    +-- app
    |   \-- common => contain common JS functions that will be used across more than one of our controllers.
    |   \-- config => containing configuration files for Passport
    |   \-- controllers
    |   \-- models => for database models. In this case, this is where the Mongoose
	 						 schemas will be defined. These models are definitions of desired
							 data structure that will be inserted into the database.
    |   \-- routes
    |
    +-- public
    |   \-- css
    |   \-- img
