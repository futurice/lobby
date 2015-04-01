angular.module( 'lobby.admin', [])
.config( ['$stateProvider',function config( $stateProvider ) {
  $stateProvider
    .state( 'admin', {
     url: '/admin',
     views: {
      "main": {
        abstract: true,
        controller: 'AdminCtrl',
        templateUrl: 'admin/index.tpl.html'
      }
    },
    })
    .state('admin.feedback', {
      url: '/feedback',
      controller: 'AdminCtrl',
      templateUrl: 'admin/_feedback.tpl.html'
    })
    .state('admin.events', {
      url: '/events',
      controller: 'SystemEventCtrl',
      templateUrl: 'admin/_systemevents.tpl.html'
    })
    .state('admin.users', {
      url: '/users',
      controller: 'OsAdminCtrl',
      templateUrl: 'admin/_openspace_users.tpl.html',
    })
    .state('admin.checkins', {
      url: '/checkins',
      controller: 'OsAdminCtrl',
      templateUrl: 'admin/_openspace_checkins.tpl.html',
    })
    .state('admin.messages', {
      url: '/messages',
      controller: 'OsAdminCtrl',
      templateUrl: 'admin/_openspace_checkins.tpl.html',
    });
}])

.controller('AdminCtrl', ['$scope', '$sails', '$http', 'config','$state',
  function AdminController( $scope, $sails, $http, config, $state) {

    $scope.getFeedback = function() {
      $sails.get("/api/feedback")
        .success(function(data,status,headers,config){
          $scope.feedbacklist = data;
        })
        .error(function(data,status,headers,config){
          $scope.errors = data.err;
        });
    };

    $scope.getFeedback();
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

  // Get open space users
  $scope.getUsers = function() {
    $sails.get("/api/users").success(function(data,status,headers,config) {
      $scope.users = data;
      console.log("users fetched");
    })
    .error(function(data,status,headers,config){
      $scope.errors = data.err;
    });

    // listening to updates
    $sails.on('user', function(message) {
      console.log(message);
      if (message.verb == "created") {
        $scope.users.push(message.data);
        console.log("user created!", message.data);
      }
    });
  };

  // Get open space checkins
  $scope.getLogins = function(opts) {
    $sails.get("/api/openspace").success(function(data,status,headers,config) {
      console.log("getlogins");
      $scope.logins = data;
    })
    .error(function(data,status,headers,config){
      $scope.errors = data.err;
      $('#errorPopup').foundation('reveal', 'open');
    });

    // listening to updates
    $sails.on('openspacelog', function(message) {
      console.log(message);
      if (message.verb == "created") {
        $scope.logins.push(message.data);
        console.log("new checkin!", message.data);
      }
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

  //$state.go("admin.users");
  $scope.getUsers();
  $scope.getLogins();
}]);