var MyEvent = require('./models/eventsModel.js')
var User = require('./models/usersModel.js')
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer  =   require('multer');
var app = express();

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


var cookieParser = require('cookie-parser')();
app.use(cookieParser);

var session = require('cookie-session')
({keys:['secret']});
app.use(session);




var passport=require('passport');
app.use(passport.initialize());
app.use(passport.session());

var localStrategy=require('passport-local').Strategy;


passport.use(new localStrategy(function(username,password,done){
    User.find({login:username,password:password},
    function(err,data){
        if(data.length==1){
            return done(null,{id:data[0]._id});
        }
        return done(null,false);
    });
}));

passport.serializeUser(function(user,done)
{
    done(null,user);
});

passport.deserializeUser(function(obj,done){
    User.find({_id:obj.id},function(err,data){
        try{
        if(data.length==1){
            done(null,{login:data[0].login,_id:data[0]._id,name:data[0].name,surname:data[0].surname});
        }
        else
        done(null,false);
    }catch(ex){
        console.log(ex);
        done(null,false);  
    }
    });
});



var myAuth=function(req,res,next){
    if(req.isAuthenticated()) 
        next();
    else 
        res.redirect('/login');
}



app.post('/login',
passport.authenticate('local', { successRedirect: '/',
                                 failureRedirect: '/login' }));


app.get('/login',function(req,res){
    res.sendFile(__dirname+"/public/pages/login.html");
});

app.get('/',myAuth);
app.get('/', function (req, res) {
    res.sendFile(__dirname+"/public/index.html");
  
});

app.post('/',function(req,res){
    User.find({login:req.user.login},{password:0},function(err,data){
    //    console.log(data);
        data[0].sex=(data[0].sex==1)?"чоловіча":"жіноча";
        res.send(data[0]);
    })
});

app.post('/loadEvents',function(req,res){
    
        MyEvent.find({isAdmins:req.body.isAdmins},function(err,data){
         res.send(data);
        })
    
});

app.post('/loadMyEvents',function(req,res){
    
        MyEvent.find({idAuthor:req.user._id},function(err,data){
         res.send(data);
        })
    
});

app.post('/registration',function(req,res){
    // res.sendFile(__dirname+"/public/pages/login.html");
    try{
        if(req.body.password.length<4||req.body.password.length==undefined){
            res.send({status:0,message:"Пароль менше 4 символи"});
            return;
        }
        if(req.body.login.length<4||req.body.login.length==undefined){
            res.send({status:2,message:"Логін менше 4 символи"});
            return;
        }
        var user = new User(req.body);
            user.save(function(err,data){
                if(err){
                res.send({status:1,message:"Такий логін вже існує"});
                return;
                }
                fs.mkdir("users/"+data._id);
                res.redirect('/login');
            });
        }catch(error){
            console.log(error);
        }
});

app.get('/logout',function(req,res){
    req.logout();
    res.redirect('/login');
});



var userStorage =   multer.diskStorage({
    destination: function (req, file, callback) { 
      callback(null, './users/'+req.user._id);
    },
    filename: function (req, file, callback) {
        var filename = Date.now()+file.originalname;
      callback(null,filename );
    }
  });
  var uploadAva = multer({ storage : userStorage }).single('uplAva');

  app.post('/uploadAva',function(req,res){
                    
        uploadAva(req,res,function(err) {
            
            if(err) {
                return res.end("Error uploading file.");
            }
            User.update({_id:req.user._id},{avatar:res.req.file.path},function(err,data){
                      res.redirect('/');
                });
          });
    });
  


var event;
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {

    event.name=req.body.name;
    event.description=req.body.description;
    event.holdingDate= req.body.holdingDate;
    event.place=req.body.place;

    callback(null, './eventsPhoto/'+event._id);
  },
  filename: function (req, file, callback) {
      var filename = file.fieldname + '-' + Date.now()+file.originalname;
      event.pictures.push(filename);
    callback(null,filename );
  }
});
var upload = multer({ storage : storage }).array('upl',10);//10 - максимальна к-сть фото


app.post('/uploadFile',function(req,res){

 
    var newEvent={
                    creationDate:new Date(),
                     idAuthor:req.user._id,
                     authorName:req.user.name+" "+req.user.surname,
                     isAdmins:(req.user.login=="admin")?true:false
                }
     
                event=new MyEvent(newEvent);
                fs.mkdir("eventsPhoto/"+event._id);
                

    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }

        
        event.save(function(err,data){
            res.redirect('/');
        })
         
     });
});





/* пошук Користувачів */
app.post('/searchUser',function(req,res){
    console.log(req.body);
User.find({name:req.body.name},{password:0},function(err,data){

        res.send(data);
})
// console.log(req.body);
// User.find({name:{ $regex: '/\S*'+req.body.name+'\S*/' }},{password:0},function(err,data){

//         res.send(data);
// })
});

/* */



app.post('/getAva',function(req,res){
    User.find({_id:req.body.id},function(err,data){
       res.send({
           _id:data[0]._id,
           avatar:data[0].avatar,
           name:data[0].name+" "+data[0].surname
       })
    });
});



app.post('/deleteEvent',function(req,res){
    MyEvent.remove({_id:req.body._id},function(err,data){
        res.send(data);
    });

});










app.listen(process.env.PORT || 8080);
  console.log('Start.....');
