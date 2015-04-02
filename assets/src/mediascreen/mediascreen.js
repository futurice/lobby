angular.module( 'mediascreen', [
  'ui.router',
  'ngSails',
  'angularMoment',
  'wu.masonry',
  'lodash',
  'templates',
  'services',
  'models',
  'mediascreen.index'
])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ( $stateProvider, $urlRouterProvider, $locationProvider ) {
  $urlRouterProvider.when('', '/');
}])

.run( function run () {
  moment.locale('en');
});
