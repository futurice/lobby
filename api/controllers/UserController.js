module.exports = {

  // Fetch all open space users
  getAll: function(req, res) {
	User.find({},function(err,found){
      if (err) {
      	SystemEvent.add("ERROR", "Error while retrieving userdata: "+err);
        return res.json(503,{err:"Error while retrieving userdata"});
      }
      if (req.isSocket) {
        User.watch(req);
        User.subscribe(req.socket, found);
        console.log(req.socket.id, "subscribed to user upd");
      }
      res.json(found);
    });
  },

  // Check-in an open space user
  checkin: function(req, res) {
    User.findOne({ phone: req.param('phone') },function(err,found) {
      if (!err && found) {

  	    OpenSpaceLog.create({
          user: found.id,
          comment: req.param("comment")
        }, function(err, created) {
          console.log("created log entry", created);
          OpenSpaceLog.publishCreate(created);
        });
        var d = new Date();
  			User.update({id:found.id}, {last_seen:d.getTime()}, function(err,updated) {
  				if (err) {
            SystemEvent.add("ERROR", "User update: "+err);
  					console.log("user up err", err);
            return res.json(503, err)
  				}
  				else {
            console.log("123");
            updated = updated[0];
            User.publishUpdate(updated.id, updated);
            SystemEvent.add("CheckIn", updated.first_name +' '+ updated.last_name);
  					console.log("up", updated);
            return res.json(updated);
  				}
  			});
      }
      else {
        return res.json(404,{err:"User not found"});
      }
    });
  },

  // Create a new open space user and check in
  create: function (req, res) {
    var d= new Date();
    var user = {
		  email: req.param('email'),
		  first_name: req.param('first_name'),
      last_name: req.param('last_name'),
      phone: req.param('phone'),
		  last_seen: d.getTime(),
    };

    User.create(user).exec(function(err, user) {
      if (err) {
        SystemEvent.add("ERROR", "User creation failed: " + err);
      	return res.json(422, err);
      }
      else {
        SystemEvent.add("UserCreate",  user.first_name +' ' + user.last_name);
        User.publishCreate(user);
        var d = new Date();
        var model = {
          user: user.id,
          comment: req.param("comment")
        };
        OpenSpaceLog.create(model, function(err, created) {
          if (err) {
            res.json(422, err);
          }
          else {
            OpenSpaceLog.publishCreate(created);
            res.json(created);
          }
        });
      }
    });
  }
};
