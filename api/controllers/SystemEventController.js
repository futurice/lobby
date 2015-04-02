/**
 * SystemEventController
 *
 * @description :: Server-side logic for managing Systemevents
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * `SystemEventController.getAll()`
   */
  getAll: function(req, res) {
    SystemEvent.find({}, function(err, models) {
      if (err) {
        console.log(err);
        return res.json(503,{err:"Error while retrieving system events"});
      }
      if (req.isSocket) {
        SystemEvent.watch(req);
        SystemEvent.subscribe(req.socket, models);
        console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'systemevent\'.');
      }
      res.json(models);
    });
  },

  delete: function(req, res) {
    SystemEvent.destroy({}, function (err) {
      if (err) {
        console.log(err);
        SystemEvent.add("ERROR", "Error deleting system event entries: "+err);
        return res.json(503,{err:"Error while deleting event entries"});
      }
    });
    return res.json(200);
  }
};
