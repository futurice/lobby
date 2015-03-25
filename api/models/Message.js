/**
* Message
*
* @description :: Represents a single that is shown on the media screen
*/

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    visibleUntil: {
      type: 'datetime',
    },
    visible: {
      type: 'boolean',
      defaultsTo: true
    },
    eventTime: {
      type: 'datetime'
    }
  },

  getAll: function() {
    return Message.find();
    // TODO: sort by createdAt DESC does not work here
    //.sort('title')
    /*
    .populate('user')
    .then(function (models) {
      return [models];
    });
    */
  },

  getOne: function(id) {
    return Message.findOne(id)
    /*
    .populate('user')
    .then(function (model) {
      // you have the option to do something with the model here if needed, before returning it to the controller
      return [model];
    });
    */
  }
};
