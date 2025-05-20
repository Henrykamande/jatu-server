var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FarmApplication = new mongoose.Schema({
  acres: { type: Number },
  name: { type: String },
  userSerialNo: { type: String },
  phoneNumber: { type: String },
  contactEmail: { type: String },
  farm: { type: Schema.Types.ObjectId, ref: "AvailableFarm", default: null },
});

module.exports = mongoose.model("FarmApplication", FarmApplication);
