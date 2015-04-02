angular.module( 'lobby.home', [])
.config( ['$stateProvider',function config( $stateProvider ) {
	$stateProvider.state( 'home', {
		url: '/',
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'app/home/index.tpl.html'
			}
		}
	});
}])

.controller( 'HomeCtrl', ['$scope',function HomeController( $scope ) {
}]);
