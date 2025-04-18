var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var FarmRequestSchema= new mongoose.Schema({
    investor: { type: Schema.Types.ObjectId, ref: "AgriInvestor", default: null },
    selectedCountry: { type : String },
    selectedZone: { type : String },
    farmSize: { type : String },
    acrePrice: { type : String },
    contract: { type : String },
    tenure: { type : String },
    selectedProject: { type : String },
    rainFeed: { type : String },
    irrigation: { type : String },
    domesticWater: { type : String },
    electricity: { type : String }
});

module.exports=mongoose.model('FarmRequest', FarmRequestSchema);
