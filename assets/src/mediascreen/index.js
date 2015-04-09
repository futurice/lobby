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
  $scope.clock = new Date();
  $scope.weather = {};

  $scope.getBlogEntries = function() {
    $sails.get('/api/blog/')
      .success(function(data,status,headers,config) {
        var articles = data;

        $scope.allBlogEntries = _.map(articles, function(article) {
            article.author = article.authors[0];
            return _.omit(article, 'authors');
          });
        console.log("recv", data);
        $scope.blog = $scope.allBlogEntries.slice(0, 8);
      })
      .error(function(data,status,headers,config){
        $scope.errors = data.err;
      });
  };

  $scope.getWeather = function() {
    $http.get("http://api.openweathermap.org/data/2.5/weather?id=658225")
      .success(function(data,status,headers,config) {
        console.log("weather", data);
        var weather = data.weather;
        $scope.weather = {
          location: data.name,
          icon: weather[0].id,
          desc: weather[0].main,
          wind: data.weather.speed,
          temp: parseFloat(data.main.temp - 273).toFixed(1)
        };
      })
      .error(function(data,status,headers,config){
        $scope.errors = data.err;
        console.log("errr", data.err);
      });
  }

  $scope.messages = [];
  $scope.blogVisible = true;

  // Get messages
  $scope.getMessages = function() {
    $sails.get("/api/messages").success(function(data,status,headers,config) {
      $scope.messages = data;
      console.log("messages fetched", data);
      $scope.blogVisible = !data.length;
    })
    .error(function(data,status,headers,config){
      $scope.errors = data.err;
    });

    // listening to updates
    $sails.on('message', function(message) {
      console.log(message);
      if (message.verb == "created") {
        $scope.messages.push(message.data);
        console.log("message created!", message.data);
        $scope.blogVisible = false;
      }
      if (message.verb == "destroyed") {
        var deleted = _.findWhere($scope.messages, { id: message.id });
        $scope.messages = _.without($scope.messages, deleted);
        $scope.blogVisible = !$scope.messages.length;
      }
    });

    //$scope.blogVisible = false;
  };

  var tick = function() {
    $scope.clock = Date.now()
  }

  var shuffle = function() {
    var total = config.BLOG_SHUFFLE_ENTRIES - 1;
    var i = getRandom(0, total), newArticle = $scope.allBlogEntries[i];
    while ($scope.blog.indexOf(newArticle) != -1) {
      i = getRandom(0, total);
      newArticle = $scope.allBlogEntries[i];
    }
    var pos = getRandom(0, 7);
    $scope.blog.splice(pos, 1, newArticle);
  }

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  $interval(tick, 1000);
  $interval(shuffle, config.BLOG_SHUFFLE_TIME);
  $scope.getBlogEntries();
  $scope.getWeather();
  $scope.getMessages();
}]);
