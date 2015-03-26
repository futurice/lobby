angular.module( 'lobby.employees', [])

  .config( ['$stateProvider',function config( $stateProvider ) {
    $stateProvider
      .state( 'employees', {
        url: '/employees',
        views: {
          "main": {
            controller: 'EmployeeCtrl',
            templateUrl: 'employees/index.tpl.html'
          }
        },
      });
    }])

.controller( 'EmployeeCtrl',['$scope', '$rootScope', '$http', 'config', '$state',
  function EmployeeController( $scope, $rootScope, $http, config, $state ) {

  $scope.show_i = config.RESULTS_SHOW_AMOUNT;
  $scope.searchText = '';
  $scope.filteredEmployees = [];

  $scope.loadMore = function() {
    $scope.show_i += config.RESULTS_SHOW_AMOUNT;
  };

  $scope.selectEmployee = function(employee) {
    $scope.selected = employee;
    $('#employeeSelect').foundation('reveal', 'open');
  };

  $scope.filterEmployees = function() {
    $scope.filteredEmployees = $rootScope.fuse.search($scope.searchText);
  }

  $scope.notify = function(employee) {
    $scope.selected = employee;
    var msg = "Futurice Lobby - You have a visitor";

    $http.put("/api/notify",
      {
        "type": "sms",
        "recipient": employee.phone1,
        "message": msg
      }
    );

    $scope.closeModal();
    $state.go("finish.notification");
  };

  $scope.closeModal = function() {
    $('#employeeSelect').foundation('reveal', 'close');
  };
}]);
