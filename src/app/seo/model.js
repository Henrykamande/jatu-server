var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var MetaSchema = new mongoose.Schema({
    metaTitle: { type : String },
    h1: { type : String },
    h2: { type: String },
    actionUrl: { type: String },
    highlight: { type: String },
    pageDescription: { type : String },
    metaDescription: { type : String },
    pageContent: { type: String },
    footerContent: { type : String },
    carouselImages: [],
    banner: { type: String, default: 'default.jpg' },
    image: { type: String },
    keywords: [],
    url: { type: String, unique: true, required: true }
});

module.exports = mongoose.model('Meta', MetaSchema);


