/**
* SystemEvent.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name : { type: 'string' },

    date : { type: 'string' },

    details : { type: 'string' }
  },

addSystemEvent: function (eventName, eventDetails) {
	var d = new Date();
	if (eventDetails != undefined) {
	    var model = {
			name: eventName,
			date: d.toString(),
			details: eventDetails
		};
	}
	else{
		var model = {
			name:eventName,
			date: d.toString(),
			details: ""
		}
	}

	SystemEvent.create(model).exec(function(err, model){
		//todo stuff
		if (err) {
			console.log(err);
		}
	});
}


};

