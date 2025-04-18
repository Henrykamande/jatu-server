var mongoose =require('mongoose');

var CategorySchema= new mongoose.Schema({
    name: { type : String },
    url: { type: String, unique: true, required: true }	
});

module.exports=mongoose.model('Category', CategorySchema);
