angular.module( 'lobby.finish', [])
.config( ['$stateProvider',function config( $stateProvider ) {
  $stateProvider

  .state( 'finish', {
    url: '/finish',
    views: {
      "main": {
        abstract: true,
        controller: 'FinishCtrl',
        templateUrl: 'app/finish/index.tpl.html'
      }
    }
  })

  .state( 'finish.delivery', {
    url: '/delivery',
    templateUrl: 'app/finish/_delivery.tpl.html'
  })

  .state( 'finish.notification', {
    url: '/notification',
    templateUrl: 'app/finish/_notification.tpl.html'
  })

  .state( 'finish.openspace', {
    url: '/openspace',
    templateUrl: 'app/finish/_openspace.tpl.html'
  })

  .state( 'finish.help', {
    url: '/help',
    templateUrl: 'app/finish/_help.tpl.html'
  })

  .state( 'finish.feedback', {
    url: '/feedback',
    templateUrl: 'app/finish/_feedback.tpl.html'
  });
}])

.controller( 'FinishCtrl',['$scope', function FinishController( $scope ) {
}]);