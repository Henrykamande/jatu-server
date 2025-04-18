var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var RegionSchema= new mongoose.Schema({
    name: { type : String },
    url: { type: String, unique: true, required: true },
    country: { type: Schema.Types.ObjectId, ref: 'Country', default: null }
});

module.exports=mongoose.model('Region', RegionSchema);
