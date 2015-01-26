angular.module( 'lobby.employees', [])

  .config( ['$stateProvider',function config( $stateProvider ) {
    $stateProvider.state( 'employees', {
      url: '/employees',
      views: {
       "main": {
        controller: 'EmployeeCtrl',
        templateUrl: 'employees/index.tpl.html'
      }
    },
  });
}])

.controller( 'EmployeeCtrl',[ '$scope', 'config', 'EmployeeModel',
  function EmployeeController( $scope, config, EmployeeModel ) {


  $scope.employees = [];
  $scope.searchText = '';

  // Fetch the employee listing
  EmployeeModel.getAll($scope).then(function(models) {
    $scope.employees = JSON.parse(models);
  });

  $scope.selectEmployee = function(employee) {
    alert("selected " + employee.name);
  }
}]);
