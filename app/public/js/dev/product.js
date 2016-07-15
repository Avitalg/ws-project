var categories = angular.module('product', [
   // 'ngRoute'
  ])
categories.controller('productCtrl', ['$scope','$http','$window', function($scope, $http,$route, $window){

	var prodId = $location.search().id;

	$http.get("https://webserviceproj.herokuapp.com/api/getProduct/"+prodId)
	.success(function(data){
		$scope.prod = data;
	})
	.error(function(data, status){
		$window.location.href = '/index.html';
	});
}]);
  