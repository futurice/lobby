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
	$scope.predicate = "-tstamp";
    $scope.users = [{first_name:"Nope",last_name:"Nope",mail:"Nope"}];
    $scope.getUser = function(){
        $http.get("/api/user?phone="+$scope.person.phone)
            .success(function(data,status,headers,config){
                //$scope.errors = "Welcome "+ data.first_name +" "+data.last_name+ "!"; 
                $state.go("finish.openspace");
            })
            .error(function(data,status,headers,config){
                $scope.errors = data.err;
            });
    };
    
   
    $scope.register = function(){
        $http.post("/api/user/",$scope.person)
            .success(function(data,status,headers,config){
                //$scope.errors = "saved succesfully";
                $state.go("finish.openspace");
            })
            .error(function(data,status,headers,config){
                $scope.errors = "registering failed";
            });

    }
    $scope.getAll = function(){
    $http.get("/api/users")
            .success(function(data,status,headers,config){
				for (var i=0;i<data.length;i++){
					
					
					data[i].tstamp = data[i].last_seen ? parseInt(data[i].last_seen) :0;
					var d = new Date(data[i].tstamp);
					data[i].time = d.toUTCString();				
				}                
				$scope.users =  data;
			
            })
            .error(function(data,status,headers,config){
            $scope.errors = data.err;
            });
    };
	$scope.getAll();
    setInterval($scope.getAll,10000);
}]);

