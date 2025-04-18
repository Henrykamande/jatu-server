var mongoose =require('mongoose');

var EmailSchema= new mongoose.Schema({
    name: { type : String },
    url: { type: String, unique: true, required: true }	
});

module.exports=mongoose.model('Email', EmailSchema);
