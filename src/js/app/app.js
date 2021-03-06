var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when("/", {
    templateUrl: 'pages/home.html',
    controller:''
  })
  .when('/item', {
    templateUrl: 'pages/item.html',
    controller: 'ItemCtrl'
  })
  .otherwise({
    redirectTo: '/'  
  });
}]);

app.controller('ListCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $http({
    method: 'GET',
    url: 'data.json'
  }).then(function(res) {
    $scope.data = res.data; 
  }, function() {
    console.error('Error'); 
  });

}]);

app.controller('ItemCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  let itemId = parseInt($location.search().id);

  $http({
    method: 'GET',
    url: 'data.json'
  }).then(function(res) {
    let data = res.data;
    $scope.item = data.filter(function(item) {
      return item._id === itemId; 
    })[0];
  }, function() {
    console.error('Error'); 
  });

}]);
