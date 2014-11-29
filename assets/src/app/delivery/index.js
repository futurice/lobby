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

.controller( 'DeliveryCtrl',['$scope', function DeliveryController( $scope ) {
}]);