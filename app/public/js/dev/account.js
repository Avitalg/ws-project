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
    	if(localStorage["email"]){
    		return true;
    	}
    	return false;
    }

    $scope.rmoveFromCart = function(prodId){
    	$http.get("https://webserviceproj.herokuapp.com/api/removeFromWishList/"+localStorage.email+"/"+prodId)
		.success(function(wishList){
			for(var i=0; i<$scope.wishList.length;i++){
				if($scope.wishList[i].id == prodId){
					$scope.wishList.splice(i,1);
					return;
				}
			}
		})
		.error(function(err, status){
			$('.err-msg').html("תקלה במחיקת פריט");
		});
    }

    if($scope.checkUser()){
    	$http.get("https://webserviceproj.herokuapp.com/api/getWishList/"+localStorage.email)
		.success(function(wishList){
			$scope.wishList = wishList;
		})
		.error(function(err, status){
			$('.err-msg').html("תקלה מערכתית");
		});
    } else {
    	var msg = angular.element("<p class='msg'>אינך מחובר.</p>");
 		$("body").append(msg);
    }

});


function onSignIn(googleUser) {   // when user auth this function will call
       angular.element(document.getElementById('AccountCtrl')).scope().signIn(googleUser);

};