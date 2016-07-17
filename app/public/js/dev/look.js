var Look = angular.module('Look', [ 'ngRoute',  'UserService'])
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
      .when('/look.html', {
        templateUrl: 'look.html',
        controller: 'lookCtrl'
        })
      .when('/account.html', {
        templateUrl: 'account.html',
        controller: 'AccountCtrl'
        })
      .otherwise({
  //      redirectTo: '/'
      });

      
       $locationProvider.html5Mode(true);
  });

  var model = [];

Look.controller('lookCtrl', ['$scope','$http','$location','$window','user',
 function($scope,$http,$location,$window, user){

    $scope.slide = 1;
    var prodlook = $location.search().look;
    $scope.prod = model;
    $scope.slide=1;

    $scope.signOut = function(){
        user.onSignOut($window.gapi);
    }

    $scope.signIn = function(googleUser){
        user.onSignIn(googleUser);
    }

    $scope.getProd = function(prodId) {
        $http.get("https://webserviceproj.herokuapp.com/api/getProduct/"+prodId)
        .success(function(data){
            $scope.prod.push({product:data}); // prod is an array of products
            $('#prodItem-1').fadeIn();
        })
        .error(function(data, status){
            console.log(data);
        });
    };

    $scope.buttons = function(pos) {
      switch(pos){
        case "left":
          if($scope.slide>1) {
            $('#prodItem-'+$scope.slide).fadeOut();
            $scope.slide--;
          }
          else{
            $('.prodItem').fadeIn();
            $scope.slide = $scope.numLooks;
          }  
          break;
        case "right":
          if($scope.slide< $scope.numLooks) {
            $scope.slide++;
            $('#prodItem-'+$scope.slide).fadeIn();
          }
          else{
            $scope.slide=1;
            $('.prodItem').fadeOut();
            $('#prodItem-1').fadeIn();
          } 
          break;
      }
 
  };

  $http.get("https://webserviceproj.herokuapp.com/api/getLookSteps/"+prodlook)
    .success(function(data){
       // console.log(data);
         $scope.mylook = data; //mylook=steps
         $scope.numLooks = data.length;
          angular.forEach($scope.mylook,function(step){
             $scope.getProd(step.product_id); //in a loop getprod gets id of product
          });
 
    })
    .error(function(data, status){
        $window.location.href = '/index.html';
    });


}]);

Look.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=0; i<total; i++) {
      input.push(i);
    }

    return input;
  };
});


Look.directive('extLink', function() {
  return {
    restrict: 'A',
    link: function(scope, elem) {
      elem.bind('click', function(e) {
        location.reload();
      })
    }
  }});