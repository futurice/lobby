module.exports = {
  getAll: function(req, res) {
  	OpenSpaceLog.find().populate('user').exec(function(err, found) {
      //return if error occurs while fetching log
      if (err){
          SystemEvent.add("ERROR", "User log: "+err);
          return res.json(503,{err:"Error while retrieving userlog"});
      }
      //return empty JSON if there is no log entries
      if (!found.length) {
          return res.json({});
      }
      return found;
  });
  },
};
