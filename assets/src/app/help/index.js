angular.module( 'lobby.help', [
])

    .config( ['$stateProvider',function config( $stateProvider ) {
        $stateProvider.state( 'help', {
		url: '/help',
		views: {
			"main": {
				controller: 'HelpCtrl',
				templateUrl: 'help/index.tpl.html'
			}
		}
	});
}])

.controller( 'HelpCtrl',['$scope', '$http', function HelpController( $scope, $http ) {
	var init = function() {

		var msg = "Futurice Lobby - Someone needs help.";

		$http.put("/api/notify",
	      {
	        "type": "flowdock",
	        "message": msg
	      }
	    );
	}

	init();
}]);