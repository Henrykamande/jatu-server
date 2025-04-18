var mongoose =require('mongoose');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var SeasonSchema= new mongoose.Schema({
    country: { type: Schema.Types.ObjectId, ref: 'Country', default: null },
    zone: { type: Schema.Types.ObjectId, ref: 'Region', default: null },
    project: { type: Schema.Types.ObjectId, ref: 'Project', default: null },
    start: { type : String },
    end: { type : String }
});

module.exports=mongoose.model('ProjectSeason', SeasonSchema);
