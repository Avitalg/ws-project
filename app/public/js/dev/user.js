
var myApp = angular.module('myApp', ['UserService']);

myApp.controller('UserCtrl', function ($scope, $window, user) {

        $scope.signOut = function(){
         user.onSignOut($window.gapi);
        }

        $scope.signIn = function(googleUser){
            user.onSignIn(googleUser);
        }
    
});

