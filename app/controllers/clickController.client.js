'use strict';

(function () {

	// Variables to represent corresponding html elements
   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
	// AppUrl from .env file + api specific route
   var apiUrl = appUrl + '/api/:id/clicks';

	// Function to update click count with info given from ajax function
   function updateClickCount (data) {
      var clicksObject = JSON.parse(data); // Convert recieved ajax data to a json object
      clickNbr.innerHTML = clicksObject.clicks; // Update click count
   }

	// Immediate function to update click count when page loads
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount));

	// Event listener to perform action when addButton is clicked
   addButton.addEventListener('click', function () {

		/* Double ajax functions: When a post request is made,
			make a get request to reflect the updated change
			Remember the post request automatically calls the
			changing function through routing, so the callback just
			has to update the view */
      ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);

   deleteButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);

})();
