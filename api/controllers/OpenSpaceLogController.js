module.exports = {
  getAll: function(req, res) {
  	OpenSpaceLog.find().populate('user').exec(function(err, log) {
      //return if error occurs while fetching log
      if (err) {
        SystemEvent.add("ERROR", "User log: "+err);
        res.json(503,{err:"Error while retrieving open space log."});
      }
      console.log("subscribing to oslog changes");
      OpenSpaceLog.watch(req);
      OpenSpaceLog.subscribe(req.socket, log);
      res.json(log);
    });
  },
};
