var mongoose=require('../mymongoose.js'); 
var schemaEvent=mongoose.Schema({
        name:{type:String,require:true},
        description:{type:String},
        pictures:[{type:String}],
        place:{type:String},
        holdingDate:{type:Date},
        creationDate:{type:Date},
        idSubscribers:[{type:String}],
        idAuthor:{type:String},
        isAdmins:{type:Boolean},
        coments:[{
            text:{type:String},
            idAuthor:{type:String}
        }]

})

var myEvent=mongoose.model('myEvent',schemaEvent);
module.exports = myEvent;