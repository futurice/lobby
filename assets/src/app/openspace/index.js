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

    })
    .state('openspaceadmin', {
    url: '/osadmin',
    views: {
      "main": {
        abstract: true,
        controller: 'OpenSpaceCtrl',
        templateUrl: 'openspace/_admin.tpl.html',
      }
    }
    });
}])
.controller('OpenSpaceCtrl', ['$scope', '$sails', '$http', 'config','$state',
  function OpenSpaceController( $scope, $sails, $http, config, $state) {

  $scope.person = {first_name:"", last_name:"",email:"",phone:"", comments:""};
  $scope.errors = "";
  $scope.predicate = "-timestamp";
  $scope.timeWindow = 0;

  $scope.getUser = function() {
    $http.get("/api/user?phone="+$scope.person.phone+"&comment="+$scope.person.comment)
      .success(function(data,status,headers,config) {
        $state.go("finish.openspace");
      })
      .error(function(data,status,headers,config){
        $scope.errors = data.err;
      });
  };

  $scope.register = function() {
    $http.post("/api/user/", $scope.person).success(function(data,status,headers,config){
        $state.go("finish.openspace");
      })
      .error(function(data,status,headers,config){
        $scope.errors = "registering failed";
      });
  }

  $scope.getAllUsers = function () {
    $http.get("/api/users").success(function(data,status,headers,config) {
      $scope.users = data;
    })
    .error(function(data,status,headers,config){
      $scope.errors = data.err;
    });
  };

  $scope.getAll = function(){
    $http.get("/api/oslogins").success(function(data,status,headers,config) {
      for (var i=0;i<data.length;i++) {

    		data[i].timestamp = data[i].timestamp ? parseInt(data[i].timestamp) : 0;
    		var d = new Date(data[i].timestamp);
    		data[i].time = d.toUTCString();
      }
      $scope.logins =  data;
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

  if (!$state.includes('openspaceadmin')) { // When in other state than admin
    $scope.filterDay(); // (To list users checked in today)
    $scope.getAllUsers();
  }
  else
    $scope.getAll();
  setInterval($scope.getAll,10000);
}]);

