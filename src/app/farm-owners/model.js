var mongoose =require('mongoose');

var FarmOwnerSchema= new mongoose.Schema({
    serialNo: { type : String },
    ownerRandomId: { type: String },
    sirName: { type : String },
    firstName: { type : String },
    selectedCountry: { type : String },
    selectedZone: { type : String },
    gender: { type : String },
    age: { type : String },
    location: { type : String },
    subLocation: { type : String },
    postalAddress: { type : String },
    email: { type : String },
    phone: { type : String }
});

module.exports=mongoose.model('FarmOwner', FarmOwnerSchema);
