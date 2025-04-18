var mongoose =require('mongoose');

var SliderSchema= new mongoose.Schema({
    title: { type : String },
    h1: { type : String },
    h2: { type: String },
    buttonUrl: { type: String },
    coverImage: { type: String },
    url: { type: String, unique: true, required: true }
});

module.exports=mongoose.model('Slider', SliderSchema);
