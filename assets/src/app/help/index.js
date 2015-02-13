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

.controller( 'HelpCtrl',['$scope', '$http', '$state', 
  function HelpController( $scope, $http, $state ) {
	$scope.comments = "";

	$scope.helpMessage = function() {

		var msg = "Someone needs help";
		if ($scope.comments != "") {
			msg = msg+": "+$scope.comments;
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