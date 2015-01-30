angular.module( 'lobby.systemEvents', [])

  .config( ['$stateProvider',function config( $stateProvider ) {
    $stateProvider.state( 'systemEvents', {
      url: '/systemEvents',
      views: {
       "main": {
        controller: 'SystemEventCtrl',
        templateUrl: 'systemEvents/index.tpl.html'
      }
    },
  });
}])

.controller( 'SystemEventCtrl',['$scope', 'config', 'SystemEventModel', 
 function SystemEventController( $scope, config, SystemEventModel ) {


  $scope.systemEvents = [];
  

  // Fetch the employee listing
  SystemEventModel.getAll($scope).then(function(models) {
    $scope.systemEvents = models;
  })

}]);
