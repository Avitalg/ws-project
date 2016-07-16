var account = angular.module('accountApp', ['ngRoute','UserService']).
config(function ($routeProvider, $locationProvider ) {
       $locationProvider.html5Mode(true);
  });

var list = {list:{}};

account.controller('AccountCtrl', function($scope, $http, $window, user){
	$scope.wishList = list;

	$scope.signOut = function(){
        user.onSignOut($window.gapi);
    }

    $scope.signIn = function(googleUser){
        user.onSignIn(googleUser);
    }
    $scope.checkUser = function(){
    	console.log("user");
    	if(localStorage["email"]){
    		return true;
    	}
    	return false;
    }

    $scope.rmoveFromCart = function(prodId){
    	$http.get("https://webserviceproj.herokuapp.com/api/removeFromWishList/"+localStorage.email+"/"+prodId)
		.success(function(wishList){
			console.log("wish");
			console.log(wishList);
			for(var i=0; i<$scope.wishList.length;i++){
				if($scope.wishList[i].id == prodId){
					$scope.wishList.splice(i,1);
					return;
				}
			}
		})
		.error(function(err, status){
			console.log(err);
		});
    }

    if($scope.checkUser()){
    	$http.get("https://webserviceproj.herokuapp.com/api/getWishList/"+localStorage.email)
		.success(function(wishList){
			$scope.wishList = wishList;
			console.log("wish");
			console.log(wishList);
		})
		.error(function(err, status){
			console.log(err);
		});
    } else {
    	var msg = angular.element("<p class='msg'>אינך מחובר.</p>");
 		$("body").append(msg);
    }

});
