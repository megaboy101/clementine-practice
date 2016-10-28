/*
	Contoller function to retreive user data
	 from the api and push it to the DOM
*/

(function(){
	// Variables have || null in case property doesnt exist to avoid errors
	var profileId = document.querySelector('#profile-id') || null;
   var profileUsername = document.querySelector('#profile-username') || null;
   var profileRepos = document.querySelector('#profile-repos') || null;
   var displayName = document.querySelector('#display-name'); // No || null property since its used in profile and index
   var apiUrl = appUrl + '/api/:id';

	/* Function to set the content of an html element, reuable as callback
		for ajax requests. Takes 3 arguments:
			data: object containing api info
			element: variable of corresponding html element
			userProperty: string of property of user object to modify */
	function updateHtmlElement(data, element, userProperty){
		element.innerHTML = data[userProperty]; // Uses bracket notation since userProperty is a string
	};


	ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
		var userObject = JSON.parse(data); // Make api user object into usable JSON

		updateHtmlElement(userObject, displayName, 'displayName');

		// If statements to only update DOM elements if they are available
		if (profileId !== null){
			updateHtmlElement(userObject, profileId, 'id');
		}

		if (profileUsername !== null){
			updateHtmlElement(userObject, profileUsername, 'username');
		}

		if (profileRepos !== null){
			updateHtmlElement(userObject, profileRepos, 'publicRepos');
		}
	}));


})();
