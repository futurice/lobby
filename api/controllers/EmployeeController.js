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
   * `EmployeeController.getAll()`
   */
  getAll: function (req, res) {
    https.get("https://api.fum.futurice.com/v1/list/employees/", function(fum) {
      var body = '';
      fum.on('data', function(chunk) {
        body += chunk;
      });
      fum.on('end', function() {
        var employees = JSON.parse(body);
        return res.json(_.map(employees, function(employee) {
          return _.pick(employee, 'first_name', 'last_name', 'portrait_thumb_url', 'email', 'phone1');
        }));
      });
    }).on('error', function(e) {
      SystemEvent.add("ERROR", e);
      return res.json({'error': e});
    });
  },
};
