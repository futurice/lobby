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

.controller( 'DeliveryCtrl',['$scope', 'config', '$state', 
  function DeliveryController( $scope, config, $state ) {

  	$scope.dType = "other";
  	$scope.debug = "depuk";

	$scope.notify = function(dType) {
	    
	    switch (dType) {
			case "food":
				var msg = "Futurice Lobby - You have food";
				break;
			case "package":
				var msg = "Futurice Lobby - You have a package";
				break;
			case "other":
				var msg = "Futurice Lobby - You have a delivery";
				break;
			default:
				var msg = "Futurice Lobby - Delivery";
	    }
	    $scope.debug = msg;
	    /*
	    if ($scope.notificationMessage != "") {
	      msg += ': "'' + $scope.notificationMessage + '"';
	    }
	    $http.put("/api/notify",
	      {
	        "type": "flowdock",
	        "message": msg
	      }
	    );
	    */
	    //$state.go("finish.delivery");
	}
}]);