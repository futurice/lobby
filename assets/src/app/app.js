angular.module( 'lobby', [
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
	'lobby.about',
  'lobby.todos',
  'lobby.users'
])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider ) {

	$urlRouterProvider.otherwise('/');
}])

.run( function run () {
	moment.lang('en');
})

.controller( 'AppCtrl',['$scope', 'config', function AppCtrl ( $scope, config ) {
	config.currentUser = window.currentUser;
}]);
