var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var ProjectZonesSchema= new mongoose.Schema({
    country: { type: Schema.Types.ObjectId, ref: 'Country', default: null },
    project: { type: Schema.Types.ObjectId, ref: 'Project', default: null },
    zonesGrown: []
});

module.exports=mongoose.model('ProjectZone', ProjectZonesSchema);
