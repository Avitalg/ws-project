var categories = angular.module('product', [
    'ngRoute'
  ])
  .config(function ($routeProvider, $locationProvider ) {
    $routeProvider
      .when('/', {
        templateUrl: 'product.html',
        controller: 'productCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });

      
       $locationProvider.html5Mode(true);
  });

categories.controller('productCtrl', ['$scope','$http','$location','$window',
 function($scope, $http, $location, $window){
	
	var prodId = $location.search().id;

	$http.get("http://localhost:3000/api/getProduct/"+prodId)
	.success(function(data){
		$scope.prod = data;
	})
	.error(function(data, status){
		$window.location.href = '/index.html';
	});
}]);
