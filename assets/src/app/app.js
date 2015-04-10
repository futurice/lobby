angular.module( 'lobby', [
	'ngTouch',
	'ui.router',
	'ngSails',
	'angularMoment',
	'lodash',
	'angularMoment',
	'templates',
	'services',
	'models',
  'ngTable',
  'lobby.header',
	'lobby.home',
	'lobby.help',
  'lobby.employees',
  'lobby.delivery',
  'lobby.finish',
  'lobby.openspace',
  'lobby.feedback',
  'lobby.admin'
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
	moment.locale('en');
})

.run(function() {
  FastClick.attach(document.body);
})

.controller( 'AppCtrl',['$scope', '$interval', '$rootScope', '$location', '$timeout', 'EmployeeModel', 'config',
 function AppCtrl ( $scope, $interval, $rootScope, $location, $timeout, EmployeeModel, config ) {

  $rootScope.employees = [];
  var interval;

  $rootScope.getEmployees = function() {
    // Fetch the employee listing
    EmployeeModel.getAll($scope).then(function(models) {
      $rootScope.employees = models;
      $rootScope.fuse = new Fuse(models, config.fuse);
      $interval.cancel(interval);
      if (!$rootScope.employees.length) { // If could not get employees
        interval = $interval($rootScope.getEmployees, config.EMPLOYEE_TRYAGAIN_INTERVAL);
      } else {
        interval = $interval($rootScope.getEmployees, config.EMPLOYEE_FETCH_INTERVAL);
      }
    });
  };
  $rootScope.getEmployees();

  $scope.$on('$viewContentLoaded', function() {
    // if timer already exists, destroy it so that it resets when user navigates
    if($scope.timer) {
      $timeout.cancel($scope.timer);
    }
    $scope.timer = $timeout(function() {
      $location.path("/");
    }, config.IDLE_TIMEOUT);
  });

  $rootScope.resetTimer = function() {
    $timeout.cancel($scope.timer);
    $scope.timer = $timeout(function() {
      $location.path("/");
    }, config.IDLE_TIMEOUT);
  };

  // reset timer when clicking/moving mouse etc
  $('body').mousemove(_.throttle(function() {
    $rootScope.resetTimer();
  }, 1000));

  // reset timer when typing
  $('body').keypress(_.throttle(function() {
    $rootScope.resetTimer();
  }, 1000));

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
})

.directive('autoFocus', function() {
  return {
    link: {
      post: function postLink(scope, element, attr) {
        element[0].focus();
      }
    }
  }
});
