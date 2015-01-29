/**
 * SystemEventController
 *
 * @description :: Server-side logic for managing Systemevents
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

fs = require('fs');

module.exports = {
	


  /**
   * `SystemEventController.index()`
   */
  index: function (req, res) {
    SystemEvent.find({},function(err,found){
            if (err){
                return res.json(503,{err:"Error while retrieving system events"});
            }
            return res.json(found);
        });
  },


  /**
   * `SystemEventController.getAll()`
   */
  getAll: function(req, res) {
    SystemEvent.find({},function(err,found){
            if (err){
                console.log(err);
                return res.json(503,{err:"Error while retrieving system events"});
            }
            fs.writeFile('./log.json', "", function(err) {
              if (err) console.log(err);
              else console.log('Writing log to file...');
            });
            try {
              for (i = found.length - 1; i >= 0 ; i--) {
                fs.appendFile('./log.json', found[i].date+' '+found[i].name+': '+found[i].details+'\n',
                  function(err) {
                    if (err) {
                      console.log(err);
                    }
                });
              }
            } catch(e) {
              console.log(e);
            }
            return res.json(found);
        });
  },


  /**
   * `SystemEventController.create()`
   */
  create: function (req, res) {
    return res.json({
      todo: 'create() is not implemented yet!'
    });
  }
};

