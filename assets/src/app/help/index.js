angular.module('lobby.help', [])

.config(['$stateProvider', function config($stateProvider) {
    $stateProvider.state('help', {
        url: '/help',
        views: {
            "main": {
                controller: 'HelpCtrl',
                templateUrl: 'help/index.tpl.html'
            }
        }
    });
}])

.controller('HelpCtrl', ['$scope', function HelpController($scope) {}]);
