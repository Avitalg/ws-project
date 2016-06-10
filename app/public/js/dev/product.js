var categories = angular.module('product', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'product.html',
        controller: 'productCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

categories.controller('productCtrl', ['$scope','$http','$location', function($scope, $http, $location){
	
	var prodId = $location.search().id;

	$http.get("http://localhost:3000/api/getProduct/"+prodId)
	.success(function(data){
		$scope.prod = data;
	})
	.error(function(data, status){
		console.log(data);
	});
}]);
