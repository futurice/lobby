angular.module( 'lobby', [
	'ngTouch',
	'ui.router',
	'ngSails',
	'angularMoment',
	'lodash',
	'angularMoment',
	'templates-app',
	'services',
	'models',
  'ngTable',
  'lobby.header',
	'lobby.home',
	'lobby.help',
  'lobby.employees',
  'lobby.systemEvents',
  'lobby.delivery',
  'lobby.finish',
  'lobby.openspace',
  'lobby.feedback'
])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider ) {

  $urlRouterProvider.when('', '/');
  $urlRouterProvider.otherwise(function ($injector, $location) {
    // pass through to let the web server handle this request
    window.location = $location.$$absUrl;
  });
}])

.run( function run () {
	moment.lang('en');
})

.run(function() {
  FastClick.attach(document.body);
})

.controller( 'AppCtrl',['$scope', '$rootScope', 'EmployeeModel', 'config',
 function AppCtrl ( $scope, $rootScope, EmployeeModel, config ) {

  $rootScope.employees = [];

  $rootScope.getEmployees = function() {
    // Fetch the employee listing
    EmployeeModel.getAll($scope).then(function(models) {
      $rootScope.employees = models;
      $rootScope.fuse = new Fuse(models, {
        keys: ['first_name', 'last_name'],
        threshold: config.FUSE_THRESHOLD
      });
    });
  };
  $rootScope.getEmployees();
  setInterval($rootScope.getEmployees, config.EMPLOYEE_FETCH_INTERVAL);
}])

.directive('backImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(value) {
            element.css({
                'background-image': 'url(' + value +')',
                'background-size' : 'cover'
            });
        });
    };
});
