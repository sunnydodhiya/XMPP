/*  angular.module('myApps', []).controller('userCtrl', function($scope) {
    $scope.idd = '';
    $scope.jabberAddress = '';
    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false; 
    $scope.hideform = true; 
    $scope.editUser = function(id) {
      $scope.hideform = false;
      if (id == 'new') {
        $scope.edit = true;
        $scope.incomplete = true;
        $scope.idd = '';
        $scope.jabberAddress = '';
        } else {
        $scope.edit = true;
        $scope.idd = $scope.mappings[id].idd;
        $scope.jabberAddress = $scope.mappings[id].jabberAddress; 
      }
    };
    
    
    $scope.$watch('idd', function() {$scope.test();});
    $scope.$watch('jabberAddress', function() {$scope.test();});
    
    $scope.test = function() {
      
      $scope.incomplete = false;
      if ($scope.edit && (!$scope.idd.length ||
      !$scope.jabberAddress.length)) {
         $scope.incomplete = true;
      }
    };
    
    $scope.addRow = function(){

console.log("it came here");
    }
});    */