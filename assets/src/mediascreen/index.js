angular.module( 'mediascreen.index', [])
.config( ['$stateProvider',function config( $stateProvider ) {
  $stateProvider.state( 'index', {
    url: '/',
    views: {
      "main": {
        controller: 'MediaScreenCtrl',
        templateUrl: 'mediascreen/index.tpl.html'
      }
    }
  });
}])

.controller( 'MediaScreenCtrl', ['$scope', '$sails', '$http', 'config', '$state', '$interval',
  function ($scope, $sails, $http, config, $state, $interval) {

  $scope.blog = [];
  $scope.messages = [];
  $scope.clock = new Date();
  $scope.weather = {};

  $scope.getBlogEntries = function() {
    $sails.get('/api/blog/')
      .success(function(data,status,headers,config) {
        var articles = data.articles;


        $scope.blog = _.map(articles, function(article) {
            article.author = article.authors[0];
            return _.omit(article, 'authors');
          });
        console.log("recv", data);
      })
      .error(function(data,status,headers,config){
        $scope.errors = data.err;
      });
  };

  $scope.getMessageEntries = function() {
    $sails.get('/api/messages/')
      .success(function(data,status,headers,config) {

        $scope.messages = data;
        console.log("recv messages", data);
      })
      .error(function(data,status,headers,config){
        $scope.errors = data.err;
      });
    // listening to updates
    $sails.on('message', function(message) {
      console.log(message);
      if (message.verb == "created") {
        $scope.messages.push(message);
        console.log("pushing message");
        console.log($scope.messages);
      }
      if (message.verb == "destroy") {
        $sails.get('/api/messages/')
          .success(function(data,status,headers,config) {

            $scope.messages = data;
            console.log("recv messages after destroy", data);
          })
          .error(function(data,status,headers,config){
            $scope.errors = data.err;
          });
      }
    });
  };

  $scope.getWeather = function() {
    $http.get("http://api.openweathermap.org/data/2.5/weather?id=658225")
      .success(function(data,status,headers,config) {
        console.log("recv", data);
        var weather = data.weather;
        $scope.weather = {
          icon: "http://openweathermap.org/img/w/" + weather[0].icon + ".png",
          desc: weather[0].main,
          temp: parseFloat(data.main.temp - 273).toFixed(1)
        };
      })
      .error(function(data,status,headers,config){
        $scope.errors = data.err;
        console.log("errr", data.err);
      });
  }

  var tick = function() {
    $scope.clock = Date.now()
  }

  $interval(tick, 1000);
  $scope.getBlogEntries();
  $scope.getMessageEntries();
  $scope.getWeather();
}]);
