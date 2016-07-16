var categories = angular.module('accountApp', ['UserService']);


var list = {list:{}};

categories.controller('AccountCtrl', function($scope, $http, user){
	$scope.wishList = list;
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

    if(localStorage["email"]){
    	$http.get("https://webserviceproj.herokuapp.com/api/getWishList/"+localStorage.email)
		.success(function(wishList){
			$scope.wishList = wishList;
			console.log("wish");
			console.log(wishList);
		})
		.error(function(err, status){
			console.log(err);
		});
    }

});
