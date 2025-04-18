var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var SubCategorySchema= new mongoose.Schema({
    name: { type : String },
    url: { type: String, unique: true, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    categoryUrl: { type: String },
    image_path: { type: String }
});

module.exports=mongoose.model('SubCategory', SubCategorySchema);
