var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AvailableFarmSchema = new mongoose.Schema({
  country: { type: Schema.Types.ObjectId, ref: "Country", default: null },
  zone: { type: Schema.Types.ObjectId, ref: "Region", default: null },
  serialNo: { type: String },
  location: { type: String },
  subLocation: { type: String },
  region: { type: String },
  district: { type: String },
  ward: { type: String },
  village: { type: String },
  acres: { type: String },
  status: { type: String },
  natureOfOwnership: { type: String },
  rightOfOccupancy: { type: String },
  farmingSeason: { type: String },
  projectId: { type: Schema.Types.ObjectId, ref: "Project", default: null },
  seeds: { type: String },
  fertilizer: { type: String },
  pesticides: { type: String },
  accessibility: { type: String },
  forLease: { type: String },
  forPartnership: { type: String },
  forSale: { type: String },
  soilTest: { type: String },
  waterSource: { type: String },
  waterUse: { type: String },
  waterDistance: { type: String },
  electricitySource: { type: String },
  electricityUse: { type: String },
  electricityDistance: { type: String },
  transportAccessibility: { type: String },
  transportDistance: { type: String },
  transportAvailability: { type: String },
  serviceProvider: { type: String },
  priceMarginPerAcre: { type: String },
  inLocalCurrency: { type: String },
  inUsd: { type: String }
});

module.exports = mongoose.model("AvailableFarm", AvailableFarmSchema);
