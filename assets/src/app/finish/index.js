angular.module( 'lobby.finish', [])
.config( ['$stateProvider',function config( $stateProvider ) {
  $stateProvider

  .state( 'finish', {
    url: '/finish',
    views: {
      "main": {
        abstract: true,
        controller: 'FinishCtrl',
        templateUrl: 'finish/index.tpl.html'
      }
    }
  })

  .state( 'finish.delivery', {
    url: '/delivery',
    templateUrl: 'finish/_delivery.tpl.html'
  })

  .state( 'finish.openspace', {
    url: '/openspace',
    templateUrl: 'finish/_openspace.tpl.html'
  });
}])

.controller( 'FinishCtrl',['$scope', function FinishController( $scope ) {
}]);