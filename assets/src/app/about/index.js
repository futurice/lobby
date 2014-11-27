angular.module( 'lobby.about', [
])

    .config( ['$stateProvider',function config( $stateProvider ) {
        $stateProvider.state( 'about', {
		url: '/about',
		views: {
			"main": {
				controller: 'AboutCtrl',
				templateUrl: 'about/index.tpl.html'
			}
		}
	});
}])

.controller( 'AboutCtrl',['$scope', function AboutController( $scope ) {
}]);