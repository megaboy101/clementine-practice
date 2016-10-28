'use strict';

// Imported mongoose model
var Users = require('../models/users.js');

function ClickHandler () {
   this.getClicks = function (req, res) {
		// Operate on the document model
		Users
			// Find one document matching the username of the user requesting the data, dont show id
			.findOne({'github.id': req.user.github.id}, {'_id': false})
			// Execute something on the returned query of document(s)
			.exec(function (err, result) {
         	if (err) throw err;

				// Send the found user's click count
         	res.json(result.nbrClicks);
      	});
   };

   this.addClick = function (req, res) {
      Users
			// Find one document matching the requested users username and modify its click count
			.findOneAndUpdate({'github.id': req.user.github.id}, {$inc: {'nbrClicks.clicks': 1}})
			// Execute modification
			.exec(function(err, result){
				if (err) throw err;
				// Send resulting modified document
				res.json(result.nbrClicks);
			});
   };

	// Same as addClick
   this.resetClicks = function (req, res) {
      Users
			.findOneAndUpdate({'github.id': req.user.github.id}, {'nbrClicks.clicks': 0})
			.exec(function(err, result){
				if (err) throw err;
				res.json(result.nbrClicks);
			});
   };
}

module.exports = ClickHandler;
