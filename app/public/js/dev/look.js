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
    $scope.slide = 1;
    var prodlook = $location.search().look;
    $scope.prod = model;
    $scope.slide=0;
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
              if($scope.slide>1) $scope.slide--;
              else $scope.slide = $scope.numLooks;
              break;
              case "right":
              if($scope.slide< $scope.numLooks) $scope.slide++;
              else $scope.slide=1;
              break;
            }
         console.log($scope.slide);
         for(var i=0;i<$scope.slide;i++){
          document.getElementById("prodItem").innerHTML = 
          $scope.prod[i].image;
         }
         // switch($scope.slide){
         // case "1":
         // result=1;
         // break;
         // case "1":
         // result=2;
         // break;
         //}

     };


    

    })
    .error(function(data, status){
        $window.location.href = '/index.html';
    });


}]);

