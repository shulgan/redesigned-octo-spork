var module=angular.module("userApp",[]);
module.controller("userCtrl",function($scope,$http,$rootScope){

    $scope.user={};
    $scope.current.searchStr;
    $scope.foundUsers=null;

    $scope.getUser=function(){
        $http.post('/').then(function(data){
            $scope.user=data.data;
            $scope.user.bday= $scope.user.bday.substr(0,$scope.user.bday.indexOf("T"));
            $rootScope.$broadcast('me',{data:$scope.user});
        });
    }
    $scope.getUser();


	    $scope.searchUser=function(settings){
            $http.post('/searchUser',settings).then(function(data){
                $scope.foundUsers=data.data;
            });
        } 
});