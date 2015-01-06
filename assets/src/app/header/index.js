angular.module('lobby.header', [])

.controller('HeaderCtrl', ['$rootScope', '$scope', '$state', 'config', function HeaderController($rootScope, $scope, $state, config) {

    $rootScope.$on('$stateChangeSuccess', function() {
        $scope.home = $state.includes('home');
    });
}]);
