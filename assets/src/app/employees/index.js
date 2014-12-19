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

.controller( 'EmployeeCtrl',['$scope', '$http', 'config', 'EmployeeModel',
  function EmployeeController( $scope, $http, config, EmployeeModel ) {


  $scope.employees = [];
  $scope.searchText = '';
  $scope.showEmployees = false;

  // Fetch the employee listing
  EmployeeModel.getAll($scope).then(function(models) {
    $scope.employees = JSON.parse(models);
  });

  // Check if we want to show results when the collection changes
  $scope.$watchCollection("filteredEmployees", function( newValue, oldValue ) {
      $scope.showEmployees = newValue.length < config.RESULTS_SHOW_THRESHOLD && newValue.length;
    }
  );

  $scope.selectEmployee = function(employee) {
    alert("selected " + employee.name);
    $http.put("/api/notify",{"type":"flowdock", "message":employee.email + " valittu"});
  }
}]);
