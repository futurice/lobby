angular.module( 'lobby.feedback', [])
.config( ['$stateProvider',function config( $stateProvider ) {
  $stateProvider
    .state( 'feedback', {
     url: '/feedback',
     views: {
      "main": {
        abstract: true,
        controller: 'FeedbackCtrl',
        templateUrl: 'feedback/index.tpl.html'
      }
    },
    })
    .state('feedbackadmin', {
      url: '/fbadmin',
      views: {
        "main": {
          abstract: true,
          controller: 'FeedbackCtrl',
          templateUrl: 'feedback/_admin.tpl.html'
        }
      }
    });
}])
.controller('FeedbackCtrl', ['$scope', '$sails', '$http', 'config','$state',
      function OpenSpaceController( $scope, $sails, $http, config, $state) {

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

    $scope.getAll = function() {
      $http.get("/api/feedback")
        .success(function(data,status,headers,config){
              $scope.feedbacklist = data;
          })
          .error(function(data,status,headers,config){
              $scope.errors = data.err;
          });
    };
    $scope.getAll();
}]);

