var helpers = require('../services/helpers');

module.exports = {

  find: function(req, res) {
    var params = req.params.all(), filter = {};

    if (helpers.isValidTimestamp(params.from)) {
      filter.createdAt['>'] = new Date(params.from * 1000);
    }
    if (helpers.isValidTimestamp(params.to)) {
      filter.createdAt['<'] = new Date(params.to * 1000);
    }

    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    OpenSpaceLog.find(filter)
      .populate('user').exec(function(err, log) {
      if (err) {
        SystemEvent.add("ERROR", "User log: " + err);
        res.json(503,{err:"Error while retrieving open space log."});
      }
      if (req.isSocket) {
        console.log("subscribing to oslog changes");
        OpenSpaceLog.watch(req);
        OpenSpaceLog.subscribe(req.socket, log);
      }
      res.json(log);
    });
  }
};
