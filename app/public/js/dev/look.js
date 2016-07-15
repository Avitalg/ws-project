var Look = angular.module('Look', [
    'ngRoute'
  ])
  .config(function ($routeProvider, $locationProvider ) {
    $routeProvider
      .when('/', {
        templateUrl: 'look.html',
        controller: 'lookCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });

      
       $locationProvider.html5Mode(true);
  });

  var model = [];

Look.controller('lookCtrl', ['$scope','$http','$location','$window',
 function($scope, $http, $location, $window){
    console.log("control");
    var prodlook = $location.search().look;
    $scope.prod = model;
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
             console.log($scope.mylook);

          angular.forEach($scope.mylook,function(step){
             $scope.getProd(step.product_id); //in a loop getprod gets id of product
          });

         /*
        $scope.steps = $scope.mylook.steps;
        for(var i=0;i<$scope.steps.length;i++){
            $scope.getProd($scope.steps[i]);
        }*/
    })
    .error(function(data, status){
        $window.location.href = '/index.html';
    });


}]);
