/**
* SystemEvent.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name : { type: 'string' },

    date : { type: 'Date' },

    user : { type: 'string' }
  },

addSystemEvent: function (eventName, user) {
    var model = {
					name: eventName,
					date: new Date(),
					user: user.first_name + " " + user.last_name
				};

				SystemEvent.create(model).exec(function(err, model){
					//todo stuff
					if (err) {
						console.log(err);
					}
				});
}


};

