/**
* Event
*
* @description :: Represents a single event that happens within the application
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    isComplete: {
      type: 'boolean',
      defaultsTo: false
    },
    status:{
      type: 'string',
      required: true
    },
    user: {
      model: 'user'
    },
    timestamp: {
      type: 'datetime',
    }
  },

  afterCreate: function (evt, next) {
    // set message.user = to appropriate user model
    User.getOne(evt.user).spread(function(user) {
      evt.user = user;
      next(null, evt);
    });
  },

  getAll: function() {
    return Todo.find()
    // TODO: sort by createdAt DESC does not work here
    //.sort('title')
    .populate('user')
    .then(function (models) {
      return [models];
    });
  },

  getOne: function(id) {
    return Todo.findOne(id)
    .populate('user')
    .then(function (model) {
      // you have the option to do something with the model here if needed, before returning it to the controller
      return [model];
    });
  }
};
