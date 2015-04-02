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
      controller: 'FeedbackCtrl',
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
      controller: 'MessagesCtrl',
      templateUrl: 'admin/_messages.tpl.html',
    });
}])

.controller('AdminCtrl', ['$scope', '$sails', '$http', 'config','$state',
  function AdminController( $scope, $sails, $http, config, $state) {
    // First page to be shown
    $state.go("admin.feedback");
}])

.controller('FeedbackCtrl', ['$scope', '$sails', '$http', 'config','$state',
  function FeedbackController( $scope, $sails, $http, config, $state) {

    $scope.predicate = "-createdAt";

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

  $scope.errors = "";
  $scope.predicate = "-createdAt";
  $scope.timeWindow = 0;
  $scope.systemEvents = [];

  // Fetch the employee listing
  /*
  SystemEventModel.getAll($scope).then(function(models) {
    $scope.systemEvents = models;
  })
  */
  $scope.getAll = function() {
    $sails.get("/api/systemEvents")
      .success(function(data,status,headers,config){
        $scope.systemEvents = data;
      })

      .error(function(data,status,headers,config){
        $scope.errors = data.err;
      });

    // listening to updates
    $sails.on('systemevent', function(message) {
      console.log(message);
      if (message.verb == "created") {
        $scope.systemEvents.push(message.data);
      }
    });      
  }

  $scope.tstampgt = function(actual,expected){
    return (new Date(actual)) > expected;
  };
  $scope.filterDay = function(){
    var now = new Date();
    $scope.timeWindow = new Date(now.getFullYear(),now.getMonth(),now.getDate());
  };
  $scope.filterMonth = function(){
    var now = new Date();
    $scope.timeWindow = new Date(now.getFullYear(),now.getMonth());
  }

  $scope.requestClearing = function () {
    $('#clearingPopup').foundation('reveal', 'open');
  };

  $scope.clearHistory = function() {
    $http.delete("/api/systemevents")
    .success(function(data,status,headers,config) {
      console.log("system events cleared");
      $scope.errors = "Succesfully cleared system event history.";
      $scope.systemEvents = [];
    })
    .error(function(data,status,headers,config){
      console.log("Error clearing system events");
      $scope.errors = "Error clearing system events: "+ data.err;
    });
    $('#clearingPopup').foundation('reveal', 'close');
    $('#successPopup').foundation('reveal', 'open');
  };

  $scope.closeClModal = function() {
    $('#clearingPopup').foundation('reveal', 'close');
  };

  $scope.closeScModal = function() {
    $('#successPopup').foundation('reveal', 'close');
  };

  $scope.getAll();
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
      $scope.errors = "Error getting check-ins: "+ data.err;
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
    return (new Date(actual)) > expected;
  };
  $scope.filterDay = function(){
    var now = new Date();
    $scope.timeWindow = new Date(now.getFullYear(),now.getMonth(),now.getDate());
  };
  $scope.filterMonth = function(){
    var now = new Date();
    $scope.timeWindow = new Date(now.getFullYear(),now.getMonth());
  };

  //$state.go("admin.users");
  $scope.getUsers();
  $scope.getLogins();
}])

.controller('MessagesCtrl', ['$scope', '$sails', '$http', 'config','$state',
  function MessagesController( $scope, $sails, $http, config, $state) {

    $scope.errors = "";
    $scope.message = {title:"", description:"", visibilityTime:300000}; // 5 min

    $scope.setVisibility = function(mins) {
        $scope.message.visibilityTime = mins * 60000;
    }

    $scope.createMessage = function() {
      $http.post("api/messages",$scope.message)
        .success(function(data,status,headers,config){
            //$scope.errors = "saved succesfully";
            $scope.errors = data.err;
            $scope.created = data.visibleUntil;
            $('#successPopup').foundation('reveal', 'open');
        })
        .error(function(data,status,headers,config){
            $scope.errors = "Error creating message: "+ data.err;
            $('#errorPopup').foundation('reveal', 'open');
        });
    }

    $scope.closeModal = function() {
      $('#errorPopup').foundation('reveal', 'close');
      $('#successPopup').foundation('reveal', 'close');
    };
}]);