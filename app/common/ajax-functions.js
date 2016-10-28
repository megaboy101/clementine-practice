// Returns the current root url of the browser window (http://localhost:3000/)
var appUrl = window.location.origin;

// NOTICE NO module.exports CALL. THIS MEANS THIS FUNCTION IS A GLOBAL VARIABLE, USABLE TO ANYTHING
var ajaxFunctions = {
	// Function to make sure page is ready to make requests, takes function as argument
	ready: function ready(fn){
		// Ensures argument is function to be run
		if (typeof fn != 'function'){
			return;
		}

		// If the page is loaded, run the function argument
		if (document.readyState === 'complete'){
			return fn();
		}

		/* Else, add an event listener to run the function when the page actually loads
		   Takes 3 parameter
		     type: event to listen for
		     listener: function to execute when event occurs
		//   userCapture: Leave false */
		document.addEventListener('DOMContentLoaded', fn, false);
	},

	/* Function to handle ajax request itself
		Takes a method (GET), url, and callback funtion to manipulate the returned data */
	ajaxRequest: function ajaxRequest(method, url, callback){
		// Request Object
		var xmlhttp = new XMLHttpRequest();

		// Function to execute multiple times as the request is processed
		xmlhttp.onreadystatechange = function(){
			// If the request retrieved all the data (4) and without any errors (200)
			if (xmlhttp.readyState === 4 && xmlhttp.status === 200){
				// Run the callback function with the retreived data
				callback(xmlhttp.response);
			}
		};

		// Function to initiate the request with async true
		xmlhttp.open(method, url, true);
		// Execute the initiated function
		xmlhttp.send();
	}
};
