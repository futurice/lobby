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

.controller( 'EmployeeCtrl',['$scope', '$http', 'config', 'EmployeeModel', '$state',
  function EmployeeController( $scope, $http, config, EmployeeModel, $state ) {

  $scope.show_i = config.RESULTS_SHOW_AMOUNT;
  $scope.employees = [];
  $scope.searchText = '';
  $scope.notificationMessage = '';

  // Fetch the employee listing
  EmployeeModel.getAll($scope).then(function(models) {
    $scope.employees = models;
  });

  $scope.loadMore = function() {
    $scope.show_i += config.RESULTS_SHOW_AMOUNT;
  };

  $scope.selectEmployee = function(employee) {
    $scope.selected = employee;
    $('#employeeSelect').foundation('reveal', 'open');
  };

  $scope.notify = function(employee) {
    /*
    var msg = "Futurice Lobby - You have a visitor";
    if ($scope.notificationMessage != "") {
      msg += ': "'' + $scope.notificationMessage + '"';
    }
    $http.put("/api/notify",
      {
        "type": "flowdock",
        "message": msg
      }
    );
    */
    $scope.closeModal();
    $state.go("finish.notification");
  }

  $scope.closeModal = function() {
    $('#employeeSelect').foundation('reveal', 'close');
  };
}]);
