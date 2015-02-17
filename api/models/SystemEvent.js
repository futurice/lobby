/**
* SystemEvent.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name : { type: 'string' },
    details : { type: 'string' }
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

		/*
		*	Update log file
		*/
		SystemEvent.find({}, function(err, events){
			if (err) {
			  console.log(err);
			  return res.json(503,{err:"Error while retrieving system events"});
			}
			else console.log("System Event");

			return events;
			/*

			for (i = found.length - 1; i >= 0 ; i--) {
				fs.appendFile('./log.json', found[i].date+' '+found[i].name+': '+found[i].details+'\n',
				  function(err) {
				    if (err) {
				      console.log(err);
				    }
				});
			}
			*/
		});
	}
};
