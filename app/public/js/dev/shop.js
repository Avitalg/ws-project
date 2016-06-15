var categories = angular.module('shop', [], function($locationProvider) {
      $locationProvider.html5Mode(true);
    });

categories.controller('shopCtrl', ['$scope','$http', function($scope, $http){
	$http.get("https://webserviceproj.herokuapp.com/api/getAllCategories")
	.success(function(data){
		$scope.catrgories = data;
		console.log(data);
	})
	.error(function(data, status){
		console.log(data);
	});

	$scope.getUrl = function( count){
		console.log(count);
		return  (count)? image:"images/"+category.image_hover, "images/"+category.image;
}

}]);
