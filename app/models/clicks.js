'use strict';

var mongoose = require('mongoose'),
	 // creating a new Schema object, each corresponding to a collection
	 Schema = mongoose.Schema;


var Click = new Schema(
	{clicks: Number},
	// Used for versioning
	{versionKey: false}
);
// Object constructor representing documents
// Two arguments: singular collection name, schema name
module.exports = mongoose.model('Click', Click);


/*
In terms of a schema, we're going to define the properties within the
object and its corresponding data type. In this case, the property is
'clicks' and the data type is Number. Defining this will prevent a
String data type being passed as a value to the 'clicks' property.
*/
