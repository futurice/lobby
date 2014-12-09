/**
 * User
 *
 * @module      :: Model
 * @description :: Represents a single Open Space user
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	attributes: {
		phone: {
            type: 'string',
            required: true,
            unique:true,
        },
         email: {
			type: 'email',
			required: true,
		},
		first_name: {
			type: 'string',
			required: true
		},
        last_name: {
            type: 'string',
            required: true
        },
            
  getAll: function() {
    return User.find().then(function (models) {
      return [models];
    });
  },

  getOne: function(id) {
    return User.findOne(id).then(function (model) {
     return [model];
   });
  },

  insert: function (userObject) {
    User.create(userObject).exec(function(err, newUser) {
      if (err) {
        return err;
      }
      else {
        console.log(newUser);
        return newUser;
      }
    });
  }
}}
