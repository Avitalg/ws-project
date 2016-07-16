var categories = angular.module('shop', ['UserService']);

categories.controller('shopCtrl', function($scope, $http, user){
	$http.get("https://webserviceproj.herokuapp.com/api/getAllCategories")
	.success(function(data){
		$scope.catrgories = data;
		console.log(data);
	})
	.error(function(data, status){
		console.log(data);
	});

	$scope.signOut = function(){
        user.onSignOut($window.gapi);
    }

    $scope.signIn = function(googleUser){
        user.onSignIn(googleUser);
    }

});
