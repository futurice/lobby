angular.module( 'lobby.messageCreator', [])
.config( ['$stateProvider',function config( $stateProvider ) {
  $stateProvider
    .state( 'messageCreator', {
     url: '/messageCreator',
     views: {
      "main": {
        abstract: true,
        controller: 'MessageCtrl',
        templateUrl: 'messageCreator/index.tpl.html'
      }
    },
    });
}])

.controller('MessageCtrl', ['$scope', '$sails', '$http', 'config','$state',
  function MessageController( $scope, $sails, $http, config, $state) {

    $scope.visibilityTime = 300000; // 5 min
    $scope.message = {header:"", body:"", visibility:$scope.visibilityTime};

    $scope.setVisibility = function(mins) {
        $scope.visibilityTime = mins * 60000;
    }

    $scope.createMessage = function() {
        $http.post("api/messages",$scope.message)
          .success(function(data,status,headers,config){
              //$scope.errors = "saved succesfully";
              $state.go("finish.messageCreator");
          })
          .error(function(data,status,headers,config){
              $scope.errors = data;
          });
    }
}]);

// https://github.com/janpantel/angular-sails