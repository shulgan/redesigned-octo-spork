
var module=angular.module("loginApp",[]);
module.controller("loginCtrl",function($scope,$http){
    $scope.selected='activeLogin';
    $scope.regData={sex:'1',password:"",login:""};
    $scope.loginData={};

    $scope.logIn=function()
    {
      //  console.log($scope.loginData);
      $http.post('/login',$scope.loginData).then(function(data){
        console.log(data);
      });
    }
 
    $scope.regNow=function()
    {
        if($scope.regData.password.length<4){
            alert("Пароль менше 4 символи");
            return;
        }
        if($scope.regData.password!=$scope.regData.confirmPassword){
            alert("Паролі не співпадають");
            return;
           
        }
        console.log($scope.regData);
        $http.post('/registration',$scope.regData).then(function(data){
            
            if(data.data.status==2){
                alert(data.data.message);
                alert(2);
                return;
            }

            if(data.data.status==0){
                alert(data.data.message);
                alert(0);
                return;
            }
            if(data.data.status==1){
                alert(data.data.message);
                return;
            } 
            $scope.regData={sex:'1'};
        });
    }

});


