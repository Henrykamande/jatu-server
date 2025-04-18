var mongoose = require("mongoose");

var CountrySchema = new mongoose.Schema({
  name: { type: String },
  code: { type: String },
  cnvRate: { type: Number },
  url: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("Country", CountrySchema);
