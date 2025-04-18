var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var PageSchema= new mongoose.Schema({
    name: { type : String },
    url: { type: String, unique: true, required: true }
});

module.exports=mongoose.model('Page', PageSchema);
