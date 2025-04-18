var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var MarketWatchSchema= new mongoose.Schema({
    country: { type: Schema.Types.ObjectId, ref: 'Country', default: null },
    zone: { type: Schema.Types.ObjectId, ref: 'Region', default: null },
    project: { type: Schema.Types.ObjectId, ref: 'Project', default: null },
    price: { type : Number },
    date: { type : Date, default: Date.now }
});

module.exports=mongoose.model('MarketWatch', MarketWatchSchema);
