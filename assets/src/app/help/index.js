angular.module( 'lobby.help', [
])

    .config( ['$stateProvider',function config( $stateProvider ) {
        $stateProvider.state( 'help', {
		url: '/help',
		views: {
			"main": {
				controller: 'HelpCtrl',
				templateUrl: 'app/help/index.tpl.html'
			}
		}
	});
}])

.controller( 'HelpCtrl',['$scope', '$http', '$state',
  function HelpController( $scope, $http, $state ) {
	$scope.details = "";

	$scope.helpMessage = function() {

		var msg = "Someone needs help";
		if ($scope.details != "") {
			msg = msg+": "+$scope.details;
		}

		$http.put("/api/notify",
	      {
	        "type": "flowdock",
	        "message": msg
	      }
	    );
	    $state.go("finish.help");
	}
}]);