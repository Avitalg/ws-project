var MakeUpApp = angular.module('MakeUpApp',[]);


MakeUpApp.run(function($http) {
    $http.get("http://localhost:3000/project/getAllProducts").success(function(data){
        console.log(data);
        model.products = data;
    });
});

var model = {
    
};

MakeUpApp.controller('MakeUpCtrl',function($scope) {
    $scope.product = model;

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
