angular.module( 'lobby.mediascreen', [
])
    .config( ['$stateProvider',function config( $stateProvider ) {
        $stateProvider.state( 'mediascreen', {
		url: '/mediascreen',
		views: {
			"main": {
				controller: 'MediaScCtrl',
				templateUrl: 'mediascreen/index.html'
			}
		}
	});
}])

.controller( 'MediaScCtrl',['$scope', function MediaScController( $scope ) {
}]);