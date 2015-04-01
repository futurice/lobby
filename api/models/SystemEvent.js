/**
* SystemEvent.js
*
* @description :: Model representing internal system events.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        name : { type: 'string' },
        details : { type: 'string' },
        timestamp: { type: 'int' }
    },

	add: function (eventName, eventDetails) {
		var model = {
			name: eventName,
			details: eventDetails != undefined ? eventDetails : ""
		};

		SystemEvent.create(model).exec(function(err, model) {
			if (err) {
				console.log(err);
			}
		});

	}
};
