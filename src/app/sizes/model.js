var mongoose =require('mongoose');

var SizeSchema= new mongoose.Schema({
    name: { type : String },
    url: { type: String, unique: true, required: true }	
});

module.exports=mongoose.model('Size', SizeSchema);
