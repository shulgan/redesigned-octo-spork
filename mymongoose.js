var mongoose = require('mongoose');
mongoose.connect('mongodb://sa:1@ds119524.mlab.com:19524/socialnetwork');
console.log('connected');

module.exports=mongoose;