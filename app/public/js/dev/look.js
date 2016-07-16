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
      .otherwise({
        redirectTo: '/'
      });

      
       $locationProvider.html5Mode(true);
  });

  var model = [];

Look.controller('lookCtrl', ['$scope','$http','$location','$window','user',
 function($scope,$http,$location,$window, user){

    console.log("control");
    $scope.slide = 1;
    var prodlook = $location.search().look;
    $scope.prod = model;
    $scope.slide=0;

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
            console.log($scope.prod);

        })
        .error(function(data, status){
            console.log(data);
        });
    };
    $http.get("https://webserviceproj.herokuapp.com/api/getLook/"+prodlook)
    .success(function(data){
       // console.log(data);
         $scope.mylook = data.steps; //mylook=steps
         $scope.numLooks = data.steps.length;
          console.log($scope.mylook[0].face_image);

          angular.forEach($scope.mylook,function(step){
             $scope.getProd(step.product_id); //in a loop getprod gets id of product
          });

          $scope.getIndex = function(pos) {
            switch(pos){
              case "left":
              if($scope.slide>0) $scope.slide--;
              else $scope.slide = $scope.numLooks-1;
              break;
              case "right":
              if($scope.slide< $scope.numLooks-1) $scope.slide++;
              else $scope.slide=0;
              break;
            }
         console.log($scope.slide);

          for(var i=0;i<$scope.slide;i++){
         document.getElementById('prodItem').style.visibility = 'visible'
          // $scope.prod[i].image;
          }
     };


    

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
      console.log(elem);
      elem.bind('click', function(e) {
        location.reload();
      })
    }
  }});