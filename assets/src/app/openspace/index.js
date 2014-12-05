angular.module( 'lobby.openspace', [])
.config( ['$stateProvider',function config( $stateProvider ) {
  $stateProvider
    .state( 'openspace', {
     url: '/openspace',
     views: {
      "main": {
        abstract: true,
        controller: 'OpenSpaceCtrl',
        templateUrl: 'openspace/index.tpl.html'
      }
    },
    })
    .state('openspace.register', {
      url: '/register',
      templateUrl: 'openspace/_register.tpl.html'
    })
    .state('openspace.checkin', {
      url: '/checkin',
      templateUrl: 'openspace/_checkin.tpl.html'
    });
}])

.controller( 'OpenSpaceCtrl',['$scope', '$sails', 'lodash', 'config', 'UserModel','$filter', 'ngTableParams','$location', function OpenSpaceController( $scope, $sails, lodash, config, UserModel,$filter, ngTableParams,$location ) {
  $scope.newTodo = {};
  $scope.todos = [];
  $scope.currentUser = config.currentUser;
  $scope.stats = [
  {name: 'null', value: 0},
  {name: 'open', value: 1},
  {name: 'InProgress', value: 2},
  {name: 'AlmostComplete', value: 3},
  {name: 'finished', value: 4},
  {name: 'canceled', value: 5}

  ];

  $sails.on('todo', function (envelope) {
    switch(envelope.verb) {
      case 'created':
      $scope.todos.unshift(envelope.data);
      $scope.tableParams.data=  $scope.todos;
      $scope.tableParams.reload();
                    $scope.newTodo = {};// clear out title
                    break;
                    case 'destroyed':
                    lodash.remove($scope.todos, {id: envelope.id});
                    $scope.tableParams.data=  $scope.todos;
                    $scope.tableParams.reload();
                    break;
                case 'updated': //
                for (var i in $scope.todos) {
                  if ($scope.todos[i].id == envelope.id) {
                    $scope.todos[i].status = envelope.data.status;
                    $scope.todos[i].isComplete=($scope.todos[i].status==4)?true:false;
                    if (  envelope.data.title !== undefined )   $scope.todos[i].title = envelope.data.title;
                  }
                }
                $scope.tableParams.data = $scope.todos;
                $scope.tableParams.reload();
                break;
              }
            });

$scope.fetchTodo = function (todo) {
  todo.status = 2;
  UserModel.update(todo).then(function (model) {
  });
};
$scope.fetchedTodo = function (todo) {
 todo.status = 3;
 UserModel.update(todo).then(function (model) {
 });
};
$scope.finishTodo = function (todo) {
  todo.status = 4;
  UserModel.update(todo).then(function (model) {
  });
};
$scope.destroyTodo = function(todo) {
  UserModel.delete(todo).then(function(model) {
             // todo has been deleted, and removed from $scope.todos
             //   lodash.remove($scope.todos, {id: todo.id});
           });
};
$scope.createTodo = function(newTodo) {

  newTodo.user = config.currentUser.id;
  newTodo.status = 1;
  UserModel.create(newTodo).then(function(model) {
               // can't reset here $scope.newTodo = {};

             });
};

UserModel.getAll($scope).then(function(models) {
  $scope.todos = models.data;
  var data =$scope.todos;
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
        //console.log('  $scope.todos ',  $scope.todos)
      }]);
