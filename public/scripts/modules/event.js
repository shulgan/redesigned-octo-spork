var module = angular.module("eventApp",[]);
module.controller("eventCtrl",function($scope,$http){ 
    $scope.events=[];
    
    var status;

    $scope.current={
        dialog:null,
        img:"public/icons/photoAnon.jpg"
    }

    var authors=[];

    $scope.loadEvents=function(params){
         $http.post('/loadEvents',params).then(function(data){
              $scope.events=data.data;
              status=data.status;
              for(var i = 0; i < data.data.length;i++)
              getUserAva(data.data[i].idAuthor);
         });
    }

    $scope.loadMyEvents=function(){
        $http.post('/loadMyEvents').then(function(data){
             $scope.events=data.data;
             status=data.status;
        });
   }
   
     getUserAva=function(id){
        $http.post('/getAva',{id:id}).then(function(data){
            if(data.status==200){
                // $scope.current.img = data.data; 
                authors.push(data.data);
                
            } 
        })
   }

   $scope.loadMyEvents();

  $scope.getAva = function(event){
      for(var i = 0; i < authors.length;i++){
          if(event.idAuthor==authors[i]._id) return authors[i].avatar;
      }
      return "public/icons/photoAnon.jpg";
  }

  $scope.getAuthorName = function(event){
    for(var i = 0; i < authors.length;i++){
        if(event.idAuthor==authors[i]._id) return authors[i].name;
    }
    return "public/icons/photoAnon.jpg";
}

    $scope.getEventImage=function(event)
    {
         if(status!=200)return;
         return  "eventsPhoto/"+ event._id+'/'+event.pictures[0];
    }

    $scope.changeDialog=function(){
        $scope.current.dialog="public/views/eventsView/eventDialog.html";
    }


    $scope.calcelEvent=function(){
        document.location.reload();
    }
});