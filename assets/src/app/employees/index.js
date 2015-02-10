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

  $scope.employees = [];
  $scope.searchText = '';
  $scope.notificationMessage = '';

  // Fetch the employee listing
  EmployeeModel.getAll($scope).then(function(models) {
    var employeesJson = JSON.parse(models);

    for (var i = 0; i < employeesJson.length; i++) {
        employeesJson[i].full_name = employeesJson[i].first_name + " " + employeesJson[i].last_name;
        //employeesJson[i].first_name = "ASDF22";//employeesJson[i].first_name + " " + employeesJson[i].last_name;
    }

    $scope.employees = employeesJson;

  });

  $scope.selectEmployee = function(employee) {
    $scope.selected = employee;
    $('#employeeSelect').foundation('reveal', 'open');
  };

  $scope.notify = function(employee) {

    var msg = "Futurice Lobby - You have a visitor";
    if ($scope.notificationMessage != "") {
      msg += ': "' + $scope.notificationMessage + '"';
    }
    $http.put("/api/notify",
      {
        "type": "sms",
        "recipient": employee.phone1,
        "message": msg
      }
    );

    $scope.closeModal();
    $state.go("finish.notification");
  }

  $scope.closeModal = function() {
    $('#employeeSelect').foundation('reveal', 'close');
  };
}]);
