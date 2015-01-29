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
    alert("selected " + employee.name);
    $http.put("/api/notify",{"type":"flowdock", "message":employee.email + " valittu"});
  }
}]);
