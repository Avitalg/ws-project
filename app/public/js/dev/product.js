var categories = angular.module('product', [
    'ngRoute'
  ])
  .config(function ($routeProvider, $locationProvider ) {
    $routeProvider
      .when('/product.html', {
        templateUrl: 'product.html',
        controller: 'productCtrl'
        })
      .when('/shop.html', {
        templateUrl: 'shop.html',
        controller: 'shopCtrl'
        })
      .when('/looks.html', {
        templateUrl: 'looks.html',
        controller: 'LookCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });

      
       $locationProvider.html5Mode(true);
  });

categories.controller('productCtrl', ['$scope','$http','$location','$window','$route',
 function($scope, $http, $location, $window, $route){

	var prodId = $location.search().id;

	$http.get("https://webserviceproj.herokuapp.com/api/getProduct/"+prodId)
	.success(function(data){
		$scope.prod = data;
	})
	.error(function(data, status){
		$window.location.href = '/index.html';
	});
}]);

categories.directive('extLink', function() {
  return {
    restrict: 'A',
    link: function(scope, elem) {
      console.log(elem);
      elem.bind('click', function(e) {
        location.reload();
      })
    }
  }});