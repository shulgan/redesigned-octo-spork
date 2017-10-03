var module = angular.module("eventApp",[]);
module.controller("eventCtrl",function($scope,$http){ 
    $scope.events=[];
    var commentAuthors=[];


      

    var authors=[];
    $scope.current={
        dialog:null,
        img:"public/icons/photoAnon.jpg",
        event:{
            self:null,
            day:"Monday",
            numDay:1,
            month:"January",
            year:2017
        }
    }
    
 
    $scope.loadEvents=function(params){
         $http.post('/loadEvents',params).then(function(data){
              $scope.events=data.data;


            var date = new Date(data.data[0].holdingDate);
            $scope.current.event.day = getDayName(date.getDay());
            $scope.current.event.numDay=date.getDate();
            $scope.current.event.month=getNameMonth(date.getMonth()+1);
            $scope.current.event.year=date.getFullYear();
            $scope.current.event.self = data.data[0];
              for(var i = 0; i < data.data.length;i++)
              getUserAva(data.data[i].idAuthor);

            $scope.setEvent(data.data[0]);
         });
    }


    $scope.loadEvents({isAdmins:'false'});

    var getUserAva=function(id){
        $http.post('/getAva',{id:id}).then(function(data){
            if(data.status==200){
                // $scope.current.img = data.data; 
                authors.push(data.data);
                
            } 
        })
   }


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
}

    $scope.getEventImage=function(event)
    {
         return  "eventsPhoto/"+ event._id+'/'+event.pictures[0];
    }


    $scope.addComment=function(newCom){
        $http.post("/addComment",{text:newCom,event_id: $scope.current.event.self._id}).then(function(data){
            $scope.current.event.self.coments.push(data.data);
        })
    }

    $scope.setEvent = function(event)
    {
        var date = new Date(event.holdingDate);

        $scope.current.event.self = event;

        $scope.current.event.day=getDayName(date.getDay());
        $scope.current.event.numDay=date.getDate();
        $scope.current.event.month=getNameMonth(date.getMonth()+1);
        $scope.current.event.year=date.getFullYear();
        
        for(var i = 0; i < event.coments.length;i++){
        getCommentAuthor( event.coments[i].idAuthor);
        }
    }

    var getDayName=function(num){
        switch(num){
            case 1:return "Понеділок";
            case 2:return "Вівторок";
            case 3:return "Середа";
            case 4:return "Четвер";
            case 5:return "П'ятниця";
            case 6:return "Субота";
            case 0:return "Неділя";
        }
    }

    var getCommentAuthor=function(id){
        $http.post('/getAva',{id:id}).then(function(data){
            if(data.status==200){
                commentAuthors.push(data.data);
                
            } 
        })
    }

    $scope.getCommentAuthorAva = function(comment_id){
        for(var i = 0; i < authors.length;i++){
            if(comment_id==commentAuthors[i]._id) return commentAuthors[i].avatar;
        }
        return "public/icons/photoAnon.jpg";
    }

    $scope.getCommentAuthorName = function(comment_id){
        for(var i = 0; i < commentAuthors.length;i++){
           //  console.log (comment_id+" ---- "+commentAuthors[i]._id);
            if(comment_id==commentAuthors[i]._id){
               
                return commentAuthors[i].name;
            } 
        }
    }

   var getNameMonth=function(num){
        switch(num)
        {
            case 1: return "Січень"; 
            case 2: return "Лютий"; 
            case 3: return "Березень"; 
            case 4: return "Квітень"; 
            case 5: return "Травень"; 
            case 6: return "Червень"; 
            case 7: return "Липень"; 
            case 8: return "Серпень"; 
            case 9: return "Вересень"; 
            case 10: return "Жовтень"; 
            case 11: return "Листопад"; 
            case 12: return "Грудень"; 
        }
   }
});