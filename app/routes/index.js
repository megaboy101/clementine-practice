'use strict';

// Current working directory
var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {
	/* Middleware function to check the login status of the user requesting the
		webpage. Unless the user is authenticated, redirect to the login route */
	function isLoggedIn(req, res, next){
		if (req.isAuthenticated()){
			return next();
		}
		else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	// Home route, shows home page or redirects to login screen
   app.route('/')
      .get(isLoggedIn, function (req, res) {
         res.sendFile(path + '/public/index.html');
      });

	// Login route, shows login screen
	app.route('/login')
		.get(function(req, res){
			res.sendFile(path + 'path/login.html');
		});

	// Logout route, logs out user on request to website, then redirects to login screen
	app.route('/logout')
		.get(function(req, res){
			// Logout is a passport funtion, clears user from session
			req.logout();
			res.redirect('/login');
		});

	// Profile route, sends profile screen
	app.route('/profile')
		.get(isLoggedIn, function(req, res){
			res.sendFile(path + '/public/profile.html');
		});

	// Api route, returns json object of github user requested in URL
	app.route('/api/:id')
		.get(isLoggedIn, function(req, res){
			res.json(req.user.github);
		});

	// Route to begin user authentication
	app.route('/auth/github')
		// Passport function to run authentication, using github strategy
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			// Redirection callback function depending on whether user is real
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	// Api route to get click information about a specific user
   app.route('/api/:id/clicks')
      .get(isLoggedIn, clickHandler.getClicks)
      .post(isLoggedIn, clickHandler.addClick)
      .delete(isLoggedIn, clickHandler.resetClicks);
};
