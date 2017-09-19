var module = angular.module("mainApp",["userApp","eventApp"]);
module.controller("mainCtrl",function($scope,$http){
  

    $scope.current={
        header:"public/views/user.html",
        view:"public/views/events.html",
        advertising:""
    }

    $scope.mainShow=function(){
        $scope.current.view="public/views/main.html"
    }

    $scope.friendShow=function(){
        $scope.current.view="public/views/friends.html"
    }


    $scope.eventShow=function () {
        $scope.current.view="public/views/events.html"
        
    }

    $scope.messageShow=function(){
        $scope.current.view="public/views/messages.html"
    }
    
    $scope.photoShow=function(){
        $scope.current.view="public/views/photos.html"
    }

    $scope.settingShow=function(){
        $scope.current.view="public/views/settings.html"
    }

    $scope.exit=function(){
        $http.get('/logout').then(function(data){
            document.location.reload();
        });
    }

    $scope.searchUserShow=function(){
        $scope.current.view="public/views/searchUser.html"
    } 

});