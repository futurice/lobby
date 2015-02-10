angular.module( 'lobby.delivery', [
])
    .config( ['$stateProvider',function config( $stateProvider ) {
        $stateProvider.state( 'delivery', {
		url: '/delivery',
		views: {
			"main": {
				controller: 'DeliveryCtrl',
				templateUrl: 'delivery/index.tpl.html'
			}
		}
	});
}])

.controller( 'DeliveryCtrl',['$scope', '$http', 'config', '$state', 
  function DeliveryController( $scope, $http, config, $state ) {

  	$scope.dType = "other";

	$scope.notify = function(dType) {
	    
	    switch (dType) {
			case "food":
				var msg = "Food has arrived!";
				break;
			case "package":
				var msg = "A package has arrived!";
				break;
			default:
				var msg = "You've got a delivery";
	    }

	    $http.put("/api/notify",
	      {
	        "type": "flowdock",
	        "message": msg
	      }
	    );
	    
	    $state.go("finish.delivery");
	}
}]);