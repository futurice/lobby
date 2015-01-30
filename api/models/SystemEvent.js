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
			if (err) {
				console.log(err);
			}
		});

		/*
		*	Update log file
		*/
		SystemEvent.find({},function(err,found){
			if (err){
			  console.log(err);
			  return res.json(503,{err:"Error while retrieving system events"});
			}
			else console.log("System Event");

			fs.writeFile('./log.json', "", function(err) {
				if (err) console.log(err);
			});
		    try {
				for (i = found.length - 1; i >= 0 ; i--) {
					fs.appendFile('./log.json', found[i].date+' '+found[i].name+': '+found[i].details+'\n',
					  function(err) {
					    if (err) {
					      console.log(err);
					    }
					});
				}
		    } catch(e) {
		      console.log(e);
		    }
		});
	}
};

