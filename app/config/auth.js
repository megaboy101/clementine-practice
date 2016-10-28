'use strict';

// Used as an accessor for the data in .env

module.exports = {
	'githubAuth': {
		'clientID': process.env.GITHUB_KEY,
		'clientSecret': process.env.GITHUB_SECRET,
		// Where GitHub will send information once the user has been authenticated
		'callbackURL': process.env.APP_URL + 'auth/github/callback'
	}
};
