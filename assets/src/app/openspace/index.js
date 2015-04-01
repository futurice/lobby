angular.module( 'lobby.openspace', [])
.config( ['$stateProvider',function config( $stateProvider ) {
  $stateProvider
    .state( 'openspace', {
     url: '/openspace',
     views: {
      "main": {
        abstract: true,
        controller: 'OpenSpaceCtrl',
        templateUrl: 'openspace/index.tpl.html'
      }
    },
    })
    .state('openspace.register', {
      url: '/register',
      templateUrl: 'openspace/_register.tpl.html',

    })
    .state('openspace.checkin', {
      url: '/checkin',
      templateUrl: 'openspace/_checkin.tpl.html',

    });
}])
.controller('OpenSpaceCtrl', ['$scope', '$sails', '$http', 'config','$state',
  function OpenSpaceController( $scope, $sails, $http, config, $state) {

  $scope.person = {first_name:"", last_name:"",email:"",phone:"", comment:""};
  $scope.errors = "";
  $scope.predicate = "-last_seen";
  $scope.timeWindow = 0;

  // Check into open space
  $scope.checkIn = function() {
    $http.put("/api/user?phone="+$scope.person.phone+"&comment="+$scope.person.comment)
      .success(function(data,status,headers,config) {
        $state.go("finish.openspace");
      })
      .error(function(data,status,headers,config){
        $scope.errors = data.err;
        $('#errorPopup').foundation('reveal', 'open');
      });
  };

  // Register as an open space user
  $scope.register = function() {
    $http.post("/api/user/", $scope.person).success(function(data,status,headers,config){
        $state.go("finish.openspace");
      })
      .error(function(data,status,headers,config){
        $scope.errors = "registering failed";
        $('#errorPopup').foundation('reveal', 'open');
      });
  };

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

  $scope.tstampgt = function(actual,expected){
    return actual > expected;
  };
  $scope.filterDay = function(){
    var now = new Date();
    $scope.timeWindow = new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime();
  };

  $scope.closeModal = function() {
    $('#errorPopup').foundation('reveal', 'close');
  };

  $scope.filterDay(); // (To list users checked in today)
  $scope.getUsers();
}]);

