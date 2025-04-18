var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var NumberingSchema = new mongoose.Schema({
  expertNumber: { type: Number },
  ownerNumber: { type: Number },
  investorNumber: { type: Number },
  farmNumber: { type: Number },
  eventNumber: { type: Number },
  status: { type: String, default: "active"}
});

module.exports = mongoose.model("NumberingSeries", NumberingSchema);
