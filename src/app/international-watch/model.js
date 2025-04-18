var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var InternationalWatchSchema= new mongoose.Schema({
    watchregion: { type: String},
    project: { type: Schema.Types.ObjectId, ref: 'Project', default: null },
    unit: { type : String },
    price: { type : Number },
    date: { type : Date, default: Date.now }
});

module.exports=mongoose.model('InternationalWatch', InternationalWatchSchema);
