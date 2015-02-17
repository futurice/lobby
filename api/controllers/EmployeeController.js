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
        var employees = JSON.parse(body);
        return res.json(_.map(employees, function(employee) {
          employee = _.pick(employee, 'first_name', 'last_name', 'portrait_thumb_url', 'email', 'phone1');
          employee.full_name = employee.first_name + " " + employee.last_name;
          return employee;
        }));
      });
    }).on('error', function(e) {
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
