'use strict';

// The actual authentication portion of the application

// Github specific authentication object
var GitHubStrategy = require('passport-github').Strategy;
// User model
var User = require('../models/users');
// Authorization information
var configAuth = require('./auth');

module.exports = function(passport){
	// Transform user data into bytes to be stored within a session
	// Takes 2 arguments: user object (based on mongoose user schema),
	// and done function to proceed authentication process
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	// Decode data stored in session
	passport.deserailizeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	/*
	Actual authentication function passport uses to work with github.
	First argument is a github strategy object with the credentials.
	Second argument is a "verify callback" required by strategies to ensure
	  that the credentials are valid and supply passport with the authenticated
	  users credentials
	*/
	passport.use(new GitHubStrategy({
		clientID: configAuth.githubAuth.clientID,
		clientSecret:configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL
	},
	/* Token/refreshToken/profile supplied by github api, done by passport
	    This function handles the authenticated user's data, and determines
	    if the user is in the application database */
	function(token, refreshToken, profile, done){
		// Node async function, waits until user data is recieved to run
		process.nextTick(function(){
			// Searches the database for a github id matching the profile id it was sent
			User.findOne({'github.id': profile.id}, function(err, user){
				if (err){
					return done(err);
				}

				// If matching user is found, finish the function with a returned user
				if (user){
					return done(null, user);
				}
				// If the returned profile isnt in the database, make a new user with the credentials of the recieved profile
				else {
					// Make a new user with the appropriate credentials
					var newUser = new User();

					newUser.github.id = profile.id;
					newUser.github.username = profile.username;
					newUser.github.displayName = profile.displayName;
					newUser.github.publicRepos = profile._json.public_repos;
					newUser.nbrClicks.clicks = 0; // User starts with 0 clicks

					// Save created user to the database
					newUser.save(function(err){
						if (err) throw err;
						// finish the function with the returned new user
						return done(null, newUser);
					})
				}
			});
		});
	}));
};
