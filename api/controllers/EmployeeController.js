/**
 * EmployeeController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs');
var https = require('https');
var _ = require('lodash');

module.exports = {
  /**
   * `EmployeeController.index()`
   */
  index: function (req, res) {
    https.get("https://api.fum.futurice.com/v1/list/employees/", function(fum) {
      var body = '';
      fum.on('data', function(chunk) {
        body += chunk;
      });
      fum.on('end', function() {
        return res.json(body);  //_.pick(body, 'first_name', 'last_name', 'portrait_thumb_url', 'email', 'phone1'));
      });
    }).on('error', function(e) {
      SystemEvent.addSystemEvent("ERROR", e);
      return res.json({'error': e});
    });
    //var employees = fs.readFileSync('./employees.json', { 'encoding': 'utf8'});
    //return res.json(employees);
  },

  /**
   * `EmployeeController.notify()`
   */
  notify: function (req, res) {
    return res.json({
      todo: 'notify() is not implemented yet!'
    });
  }
};
