var mongoose =require('mongoose');

var ExpertSchema= new mongoose.Schema({
    serialNo: { type: String },
    expertRandomId: { type: String },
    sirName: { type : String },
    firstName: { type : String },
    selectedCountry: { type : String },
    selectedZone: { type : String },
    gender: { type : String },
    age: { type : String },
    education: { type : String },
    profession: { type : String },
    crops: { type : String },
    workPlace: { type : String },
    location: { type : String },
    subLocation: { type : String },
    postalAddress: { type : String },
    email: { type : String },
    phone: { type : String }
});

module.exports=mongoose.model('Expert', ExpertSchema);
