var Looks = angular.module('Looks',[]);


Looks.run(function($http) {
    $http.get("https://webserviceproj.herokuapp.com/api/getAllLooks").success(function(data){
        console.log(data);
        modelook.looks = data; //add all looks categories to model
    });
});

var modelook = {
    
};

Looks.controller('LookCtrl',function($scope) {
    $scope.mylook = modelook;

  /*  $scope.incompleteCount = function() {
        var count=0;
        angular.forEach($scope.todo.items, function(item) {
            if(!item.done) {count++;}
        });
        return count;
    };
    $scope.warningLevel = function () {
        return $scope.incompleteCount() < 3 ? "label-success":"label-warning";
    };
    $scope.addNewItem = function(actionText) {
        $scope.todo.items.push({ action: actionText, done:false});
    };*/
});
