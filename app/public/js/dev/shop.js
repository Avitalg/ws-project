var categories = angular.module('shop',['ngRoute', 'UserService'])
.config(function ($routeProvider, $locationProvider ) {
    $routeProvider
      .when('/product.html', {
        templateUrl: 'product.html',
        controller: 'productCtrl'
        })
      .when('/look.html', {
        templateUrl: 'look.html',
        controller: 'lookCtrl'
        })
      .when('/shop.html', {
        templateUrl: 'shop.html',
        controller: 'shopCtrl'
        })
      .when('/looks.html', {
        templateUrl: 'looks.html',
        controller: 'LookCtrl'
        })
      .when('/account.html', {
        templateUrl: 'account.html',
        controller: 'AccountCtrl'
        })
      .when('/managePage.html', {
        templateUrl: 'managePage.html',
        controller: 'UserCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });
       $locationProvider.html5Mode(true);
  });
  
  
categories.controller('shopCtrl', function($scope, $http, $window, user){
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

  function onSignIn(googleUser) {   // when user auth this function will call
       angular.element(document.getElementById('shopCtrl')).scope().signIn(googleUser);

      };