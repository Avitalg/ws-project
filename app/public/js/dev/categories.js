var categories = angular.module('categories', []);

categories.controller('categoryCtrl', function($scope, $http){
	$http.get("http://localhost:3000/api/getAllCategories")
	.success(function(data){
		$scope.rules = data;
		console.log(data);
	})
	.error(function(data, status){
		console.log(data);
	});
		 

});
