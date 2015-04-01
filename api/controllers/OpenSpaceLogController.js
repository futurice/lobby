var helpers = require('../services/helpers');

module.exports = {

  find: function(req, res) {
    var from = req.params('from');
    var to = req.params('to');
    var filter = {};

    if (helpers.isValidDate(from)) {
      filter.createdAt['>'] = new Date(from * 1000);
    }
    if (helpers.isValidDate(to)) {
      filter.createdAt['<'] = new Date(to * 1000);
    }

    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    OpenSpaceLog.find(filter)
      .populate('user').exec(function(err, log) {
      if (err) {
        SystemEvent.add("ERROR", "User log: " + err);
        res.json(503,{err:"Error while retrieving open space log."});
      }
      console.log("subscribing to oslog changes");
      OpenSpaceLog.watch(req);
      OpenSpaceLog.subscribe(req.socket, log);
      res.json(log);
    });
  }
};
