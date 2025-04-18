var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var FarmRegisterSchema= new mongoose.Schema({
    owner: { type: Schema.Types.ObjectId, ref: "FarmOwner", default: null },
    selectedCountry: { type : String },
    selectedZone: { type : String },
    location: { type : String },
    subLocation: { type : String },
    farmSize: { type : String },
    contract: { type : String },
    ownership: { type : String },
    crops: { type : String },
    irrigation: { type : String },
    domesticWater: { type : String },
    electricity: { type : String },
    seasonStart: { type : String },
    seasonEnd: { type : String },
    distance: { type : String },
    video: { type : String },
});

module.exports=mongoose.model('FarmRegister', FarmRegisterSchema);
