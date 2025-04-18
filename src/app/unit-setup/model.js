var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var UnitSetupSchema= new mongoose.Schema({
    country: { type: Schema.Types.ObjectId, ref: 'Country', default: null },
    zone: { type: Schema.Types.ObjectId, ref: 'Region', default: null },
    project: { type: Schema.Types.ObjectId, ref: 'Project', default: null },
    unit: { type : String },
    maxbags: { type : Number }
});

module.exports=mongoose.model('UnitSetup', UnitSetupSchema);
