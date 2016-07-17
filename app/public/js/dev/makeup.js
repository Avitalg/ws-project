var MakeUpApp = angular.module('MakeUpApp',[  'ngRoute', 'UserService'])
  .config(function ($routeProvider, $locationProvider ) {
    $routeProvider
      .when('/product.html', {
        templateUrl: 'product.html',
        controller: 'productCtrl'
        })
      .when('/shop.html', {
        templateUrl: 'shop.html',
        controller: 'shopCtrl'
        })
      .when('/looks.html', {
        templateUrl: 'looks.html',
        controller: 'LookCtrl'
        })
      .when('/product.html?:id', {
        templateUrl: 'product.html?:id',
        controller: 'productCtrl'
        })
      .otherwise({
 //        redirectTo: '/'
      });

      
       $locationProvider.html5Mode(true);
  });


var model = {
    products:{

    }
};

MakeUpApp.controller('MakeUpCtrl',function($scope, $http, $location, $window, $route, user){
    var prodId = $location.search().category;
    $scope.products = model;

   $http.get("https://webserviceproj.herokuapp.com/api/getCategoryProducts/"+prodId)
   .success(function(data){
          $scope.products.products = data;
          console.log($scope.products);

      })
   .error(function (data, status, header, config) {
                  $scope.ResponseDetails = "Data: " + data +
                      "<br />status: " + status +
                      "<br />headers: " + jsonFilter(header) +
                      "<br />config: " + jsonFilter(config);
                      console.log($scope.ResponseDetails);
              });

   $scope.signOut = function(){
        user.onSignOut($window.gapi);
    }

    $scope.signIn = function(googleUser){
        user.onSignIn(googleUser);
    }
    
});

MakeUpApp.directive('extLink', function() {
  return {
    restrict: 'A',
    link: function(scope, elem) {
      console.log(elem);
      elem.bind('click', function(e) {
        location.reload();
      })
    }
  }});