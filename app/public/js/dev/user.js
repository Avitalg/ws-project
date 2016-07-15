var User = angular.module('User',[]);
4
/*
Looks.run(function($http) {
    $http.get("https://webserviceproj.herokuapp.com/api/getAllLooks").success(function(data){
        console.log(data);
        modelUser.users = data; //add all looks categories to model
    });
});

var modelUser = {
    
};*/

User.controller('UserCtrl',function($scope, $http ) {


   // $scope.myuser = localStorage.email;
   //$scope.addUser=function(){
        $http.get("https://webserviceproj.herokuapp.com/api/addUser/"+localStorage.email+"/"+localStorage.admin)
        .success(function(data){
            $scope.User = data;
            console.log(data);
        })
        .error(function(data, status){
            console.log(data);
        });
//};

});
