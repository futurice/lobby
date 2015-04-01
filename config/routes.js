/**
 * Routes
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.routes = {
  /**
   * We set the default language for all routes
   * **/
  '/*': function(req, res, next) {
     // res.setLocale(req.param('lang') || sails.config.i18n.defaultLocale);
      res.setLocale(sails.config.i18n.defaultLocale);
      return next();
  },
  // Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, etc. depending on your
  // default view engine) your home page.
  //
  'get /': {
    controller: 'HomeController',
    action: 'index'
  },

  // Media screen
  'get /media': {
    controller: 'MediaScreenController',
    action: 'index'
  },
  'get /api/blog': 'MediaScreenController.blog',

  // Media Screen messages
  'get /api/messages': 'MessagesController.find',
  'post /api/messages': 'MessagesController.create',
  'delete /api/messages': 'MessagesController.delete',
  'put /api/messages': 'MessagesController.update',

  // Open Space Users
  'put /api/user': 'UserController.checkin',
  'post /api/user': 'UserController.create',
  'get /api/users': 'UserController.getAll',
  'get /api/openspace': 'OpenSpaceLogController.find',

  // Employees
  'get /api/employees': 'EmployeeController.getAll',

  // Notifications
  'put /api/notify' : 'NotifyController.notify',

   // Feedback routes
  'get /api/feedback' : 'FeedbackController.getAll',
  'post /api/feedback' : 'FeedbackController.create',

  // Event log
  'get /api/systemEvents': 'SystemEventController.getAll',

// If a request to a URL doesn't match any of the custom routes above, it is matched
// against Sails route blueprints.  See `config/blueprints.js` for configuration options
// and examples.

};
