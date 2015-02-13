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

.controller( 'SystemEventCtrl',['$scope', '$sails', '$http', 'config', 'SystemEventModel', 
 function SystemEventController( $scope, $sails, $http, config, SystemEventModel ) {

  //$scope.systemEvents = [];
  $scope.errors = "";

  // Fetch the employee listing
  /*
  SystemEventModel.getAll($scope).then(function(models) {
    $scope.systemEvents = models;
  })
  */
  $scope.getAll = function() {
    $http.get("/api/systemEvents")
      .success(function(data,status,headers,config){
        $scope.systemEvents = data;
      })

      .error(function(data,status,headers,config){
        $scope.errors = data.err;
      });
  }

  $scope.getAll();

}]);
