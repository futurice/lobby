/**
 * EmployeeController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs');

module.exports = {

  /**
   * `EmployeeController.index()`
   */
  index: function (req, res) {
    var employees = fs.readFileSync('./employees.json', { 'encoding': 'utf8'});
    return res.json(employees);
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
