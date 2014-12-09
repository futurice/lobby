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
.controller('OpenSpaceCtrl',['$scope', '$sails', '$http', 'config','$location', function OpenSpaceController( $scope, $sails, $http, config,$location) {

    $scope.person = {first_name:"", last_name:"",email:"",phone:"", comments:""};
    $scope.errors = "";
    $scope.getUser = function(){
        $http.get("/api/user?phone="+$scope.person.phone)
            .success(function(data,status,headers,config){
                //$scope.errors = "Welcome "+ data.first_name +" "+data.last_name+ "!"; 
                $location.path("/finish/openspace");
            })
            .error(function(data,status,headers,config){
                $scope.errors = data.err;
            });
    };
    
   
    $scope.register = function(){
        $http.post("/api/user/",$scope.person)
            .success(function(data,status,headers,config){
                //$scope.errors = "saved succesfully";
                $location.path("/finish/openspace");
            })
            .error(function(data,status,headers,config){
                $scope.errors = "registering failed";
            });

    }
}]);

