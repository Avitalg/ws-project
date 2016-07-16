var Looks = angular.module('Looks',['UserService']);


Looks.run(function($http) {
    $http.get("https://webserviceproj.herokuapp.com/api/getAllLooks").success(function(data){
        console.log(data);
        modelook.looks = data; //add all looks categories to model
    });
});

var modelook = {
    
};

Looks.controller('LookCtrl',function($scope, user) {
    $scope.mylook = modelook;

   $scope.signOut = function(){
        user.onSignOut($window.gapi);
    }

    $scope.signIn = function(googleUser){
        user.onSignIn(googleUser);
    }
});
