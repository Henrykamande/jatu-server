const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EquipmentApplications = new mongoose.Schema({
    countryAt: { type: String },
    SerialNo: { type: Schema.Types.ObjectId, ref: "ListedFarmEquipments", default: null },
    region: { type: String },
    district: { type: String },
    ward: { type: String },
    village: { type: String },
    farmCode: { type: String },
    farmSize: { type: Number },
    projectType: { type: String },
    farmingSchedule: { type: String }
});

module.exports = mongoose.model("EquipmentApplications", EquipmentApplications);