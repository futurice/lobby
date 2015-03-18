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
    SystemEvent.find({},function(err,found){
      if (err){
          console.log(err);
          return res.json(503,{err:"Error while retrieving system events"});
      }

      // Create timestamps
      for (var i=0;i<found.length;i++) {
        found[i].timestamp = found[i].createdAt.getTime();
      }
      return res.json(found);
    });
  }
};

