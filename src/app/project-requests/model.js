var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var ProjectRequestSchema = new mongoose.Schema({
  project: { type: Schema.Types.ObjectId, ref: "Project", default: null },
  sirName: { type: String },
  otherNames: { type: String },
  country: { type: String },
  acres: { type: Number },
  phoneNo: { type: String },
  address: { type: String },
  physicalLocation: { type: String },
  costs: [],
});

module.exports = mongoose.model("ProjectRequest", ProjectRequestSchema);
