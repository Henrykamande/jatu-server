var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var CostItemSchema = new mongoose.Schema({
  project: { type: Schema.Types.ObjectId, ref: "Project", default: null },
  name: { type: String },
  acreCost: { type: Number },
  partnerCost: { type: Number },
});

module.exports = mongoose.model("CostItem", CostItemSchema);
