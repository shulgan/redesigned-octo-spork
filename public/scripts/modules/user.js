var module=angular.module("userApp",[]);
module.controller("userCtrl",function($scope,$http){
    $scope.user={};
    $scope.current.searchStr;
    $scope.foundUsers=null;

    $scope.getUser=function(){
        $http.post('/').then(function(data){
            console.log(data);
           // data.data.bday=data.data.bday;
            $scope.user=data.data;
        });
    }
    $scope.getUser();

	    $scope.searchUser=function(settings){
            console.log(settings);
        $http.post('/searchUser',settings).then(function(data){
            $scope.foundUsers=data.data;
            console.log($scope.foundUsers);
        });
    } 
});