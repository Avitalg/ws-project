var categories = angular.module('product', ['ngRoute', 'UserService'])
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

categories.controller('productCtrl', ['$scope','$http','$location','$window','$route','user',
 function($scope, $http, $location, $window, $route, user){

	var prodId = $location.search().id;

	$http.get("https://webserviceproj.herokuapp.com/api/getProduct/"+prodId)
	.success(function(data){
		$scope.prod = data;
	})
	.error(function(data, status){
		$window.location.href = 'index.html';
	});

    $scope.signOut = function(){
        user.onSignOut($window.gapi);
    }

    $scope.signIn = function(googleUser){
        user.onSignIn(googleUser);
    }

    $scope.addToCart= function(){
      if(localStorage["email"]){
        $http.get("https://webserviceproj.herokuapp.com/api/addToWishList/"+localStorage["email"]+"/"+prodId)
        .success(function(data){
          if(data["success"]){
           $('.cart-msg').html("נוסף בהצלחה.");
          } else {
            $('.cart-msg').html("קיים בעגלה.");
          }
        })
      } else {
         $('.cart-msg').html("עליך להתחבר.");
      }
    }

}]);

categories.directive('extLink', function() {
  return {
    restrict: 'A',
    link: function(scope, elem) {
      elem.bind('click', function(e) {
        location.reload();
      })
    }
  }});
  
  
  function onSignIn(googleUser) {   // when user auth this function will call
       angular.element(document.getElementById('productCtrl')).scope().signIn(googleUser);
      };