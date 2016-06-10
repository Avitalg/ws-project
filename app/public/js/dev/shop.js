var categories = angular.module('shop', [], function($locationProvider) {
      $locationProvider.html5Mode(true);
    });

categories.controller('shopCtrl', ['$scope','$http','$window', function($scope, $http, $window){
	$http.get("http://localhost:3000/api/getAllCategories")
	.success(function(data){
		$scope.rules = data;
		console.log(data);
	})
	.error(function(data, status){
		console.log(data);
	});
	console.log($window.location);
}]);
