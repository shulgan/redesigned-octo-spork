var mongoose=require('../mymongoose.js'); 
var schemaUser=mongoose.Schema({
        login:{type:String,require:true,unique:true},
        password:{type:String,require:true,unique:true},
        name:{type:String,require:true},
        surname:{type:String,require:true},
        bday:{type:Date},
        reletionship:{type:String},
        isOnline:{type:Boolean},

        address:{
            street:{type:String},
            houseNumber:{type:Number}
        },
        friends:[{
            idFriend:{type:String},
            state:{type:String}
        }],
        conversation:[{
            name:{type:String},
            messages:[{
                idSender:{type:String},
                idRecipients:[{type:String}],
                text:{type:String},
                isRead:{type:Boolean}
            }]
        }],
        avatar:{type:String,default:"public/icons/photoAnon.jpg"},
        photos:[{type:String}],
        sex:{type:String}
    });

var user=mongoose.model('user',schemaUser);
module.exports = user;

