angular.module( 'lobby.admin', [])
.config( ['$stateProvider',function config( $stateProvider ) {
  $stateProvider
    .state( 'admin', {
     url: '/admin',
     views: {
      "main": {
        //abstract: true,
        controller: 'AdminCtrl',
        templateUrl: 'admin/index.tpl.html'
      }
    },
    })
    .state('admin_feedback', {
      url: '/admin/feedback',
      views: {
        "main": {
          controller: 'AdminCtrl',
          templateUrl: 'admin/_feedback.tpl.html'
        }
      },
    })
    .state('admin_systemevents', {
      url: '/admin/systemevents',
      views: {
        "main": {
          controller: 'SystemEventCtrl',
          templateUrl: 'admin/_systemevents.tpl.html'
        }
      },
    })
    .state('admin_openspace', {
      url: '/admin/openspace',
      views: {
      "main": {
        abstract: true,
        controller: 'OsAdminCtrl',
        templateUrl: 'admin/_openspace.tpl.html',
      }
    },
    })
    .state('admin_openspace.users', {
      url: '/users',
      templateUrl: 'admin/_openspace_users.tpl.html',
    })
    .state('admin_openspace.checkins', {
      url: '/checkins',
      templateUrl: 'admin/_openspace_checkins.tpl.html',
    });
}])

.controller('AdminCtrl', ['$scope', '$sails', '$http', 'config','$state',
  function AdminController( $scope, $sails, $http, config, $state) {



    $scope.getFeedback = function() {
      $http.get("/api/feedback")
        .success(function(data,status,headers,config){
          $scope.feedbacklist = data;
        })
        .error(function(data,status,headers,config){
          $scope.errors = data.err;
        });
    };

    if ($state.includes('feedback')) {
      $scope.getFeedback();
    }
}])

.controller( 'SystemEventCtrl',['$scope', '$sails', '$http', 'config', 'SystemEventModel', 
 function SystemEventController( $scope, $sails, $http, config, SystemEventModel ) {

  //$scope.systemEvents = [];
  $scope.errors = "";
  $scope.predicate = "-createdAt";
  $scope.timeWindow = 0;

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

  $scope.tstampgt = function(actual,expected){
    return actual > expected;
  };
  $scope.filterDay = function(){
    var now = new Date();
    $scope.timeWindow = new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime();
  };
  $scope.filterMonth = function(){
    var now = new Date();
    $scope.timeWindow = new Date(now.getFullYear(),now.getMonth()).getTime();
  }

  $scope.getAll();
  setInterval($scope.getAll,10000);
}])

.controller('OsAdminCtrl', ['$scope', '$sails', '$http', 'config','$state',
  function OsAdminController( $scope, $sails, $http, config, $state) {

  $scope.errors = "";
  $scope.predicate = "-createdAt";
  $scope.timeWindow = 0;

  $scope.getUsers = function() {
    $http.get("/api/users").success(function(data,status,headers,config) {
      $scope.users = data;
    })
    .error(function(data,status,headers,config){
      $scope.errors = data.err;
    });
  };

  $scope.getLogins = function(){
    $http.get("/api/oslogins").success(function(data,status,headers,config) {
      for (var i=0;i<data.length;i++) {

        data[i].timestamp = data[i].timestamp ? parseInt(data[i].timestamp) : 0;
        var d = new Date(data[i].timestamp);
        data[i].time = d.toUTCString();
      }
      $scope.logins = data;
    })
    .error(function(data,status,headers,config){
      $scope.errors = data.err;
    });
  };
  $scope.tstampgt = function(actual,expected){
    return actual > expected;
  };
  $scope.filterDay = function(){
    var now = new Date();
    $scope.timeWindow = new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime();
  };
  $scope.filterMonth = function(){
    var now = new Date();
    $scope.timeWindow = new Date(now.getFullYear(),now.getMonth()).getTime();
  };

  $state.go("admin_openspace.users");
  $scope.getUsers();
  $scope.getLogins();
  setInterval($scope.getLogins,10000);
}]);