angular.module('lobby.delivery', [
]).config(['$stateProvider', function config($stateProvider) {
  $stateProvider.state( 'delivery', {
    url: '/delivery',
    views: {
      "main": {
        controller: 'DeliveryCtrl',
        templateUrl: 'app/delivery/index.tpl.html'
      }
    }
  });
}]).controller('DeliveryCtrl', ['$scope', '$http', 'config', '$state',
  function DeliveryController($scope, $http, config, $state) {
    $scope.notify = function() {
      var msg = "A delivery has arrived at the lobby!";
      $http.put("/api/notify", {
        type: "flowdock",
        message: msg});
      $state.go("finish.delivery");
    }
}]);
