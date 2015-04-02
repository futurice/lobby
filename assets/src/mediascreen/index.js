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
        var articles = data.articles;


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
}]);
