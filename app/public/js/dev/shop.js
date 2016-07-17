var categories = angular.module('shop', ['UserService']);

categories.controller('shopCtrl', function($scope, $http, user){
	$http.get("https://webserviceproj.herokuapp.com/api/getAllCategories")
	.success(function(data){
		$scope.catrgories = data;
	})
	.error(function(data, status){
		$('.shop_menu').html('.תקלה מערכתית');
	});

	$scope.signOut = function(){
        user.onSignOut($window.gapi);
    }

    $scope.signIn = function(googleUser){
        user.onSignIn(googleUser);
    }

});
