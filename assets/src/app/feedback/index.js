angular.module( 'lobby.feedback', [])
.config( ['$stateProvider',function config( $stateProvider ) {
  $stateProvider
    .state( 'feedback', {
     url: '/feedback',
     views: {
      "main": {
        abstract: true,
        controller: 'FeedbackCtrl',
        templateUrl: 'app/feedback/index.tpl.html'
      }
    },
    });
}])
.controller('FeedbackCtrl', ['$scope', '$sails', '$http', 'config','$state',
      function FeedbackController( $scope, $sails, $http, config, $state) {

    $scope.feedback = {comments: ""};
    $scope.errors = "";
   
    $scope.sendFeedback = function(){
      $http.post("/api/feedback/",$scope.feedback)
          .success(function(data,status,headers,config){
              //$scope.errors = "saved succesfully";
              $state.go("finish.feedback");
          })
          .error(function(data,status,headers,config){
              $scope.errors = "feedback sending failed";
          });
    }

}]);

