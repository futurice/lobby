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

.controller( 'EmployeeCtrl',['$rootScope', '$scope', 'config', 'EmployeeModel',
  function EmployeeController( $rootScope, $scope, config, EmployeeModel ) {


  $scope.employees = [];
  $scope.searchText = '';

  // Fetch the employee listing
  EmployeeModel.getAll($scope).then(function(models) {
    $scope.employees = JSON.parse(models);
  });

  $scope.selectEmployee = function(employee) {
    $rootScope.$log.debug("employee jeejee");
    alert("selected " + employee.name);
  }
}]);
