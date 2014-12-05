angular.module( 'lobby.employees', [
])

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

    .controller( 'EmployeeCtrl',['$scope', '$sails', 'lodash', 'config', 'EmployeeModel','$filter', 'ngTableParams', function EmployeeController( $scope, $sails, lodash, config, EmployeeModel, $filter, ngTableParams ) {

        $scope.newUser = {};

        $scope.users = [];
        $scope.currentUser = config.currentUser;


        $scope.destroyUser = function(user) {
            EmployeeModel.delete(user).then(function(model) {
                // todo has been deleted, and removed from $scope.todos
             //   lodash.remove($scope.todos, {id: todo.id});
            });
        };

        $scope.createUser = function(newUser) {
            console.log('new ',newUser)
            newUser.user = config.currentUser.id;

            EmployeeModel.create(newUser).then(function(model) {
                $scope.newUser.title ='';
                //= {};
            });
        };


        EmployeeModel.getAll($scope).then(function(models) {
            $scope.users = models.data;
            var data =$scope.users;
            console.log('data ',data)
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 25,          // count per page
                sorting: {

                    title: 'asc'
                }
            }, {
                 total: data.length,
                getData: function($defer, params) {
                    var orderedData = params.sorting() ?
                        $filter('orderBy')(data, $scope.tableParams.orderBy()) :
                        data;
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        });

    }]);
