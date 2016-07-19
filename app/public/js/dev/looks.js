var Looks = angular.module('Looks',['ngRoute', 'UserService'])
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


Looks.run(function($http) {
    $http.get("https://webserviceproj.herokuapp.com/api/getAllLooks").success(function(data){
        modelook.looks = data; //add all looks categories to model
    });
});

var modelook = {
    
};

Looks.controller('LookCtrl',function($scope, $window, user) {
    $scope.mylook = modelook;

   $scope.signOut = function(){
        user.onSignOut($window.gapi);
    }

    $scope.signIn = function(googleUser){
        user.onSignIn(googleUser);
    }
});

 function onSignIn(googleUser) {   // when user auth this function will call
       angular.element(document.getElementById('LookCtrl')).scope().signIn(googleUser);

};