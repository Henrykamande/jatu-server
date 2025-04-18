var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var ProjectCostSchema = new mongoose.Schema({
  project: { type: Schema.Types.ObjectId, ref: "Project", default: null },
  country: { type: Schema.Types.ObjectId, ref: "Country", default: null },
  zone: { type: Schema.Types.ObjectId, ref: "Region", default: null },
  costitem: { type: Schema.Types.ObjectId, ref: "CostItem", default: null },
  min: { type: Number },
  max: { type: Number },
  acreCost: { type: Number }
});

module.exports = mongoose.model("ProjectCost", ProjectCostSchema);
