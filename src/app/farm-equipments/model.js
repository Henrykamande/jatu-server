var mongoose = require("mongoose");

var ListedFarmEquipments = new mongoose.Schema({
    serialNo: { type: String },
    machineType: { type: String },
    make: { type: String },
    model: { type: String },
    capacity: { type: String },
    driveType: { type: String },
    mainUse: { type: String },
    countryAt: { type: String },
    region: { type: String },
    district: { type: String },
    ward: { type: String },
    village: { type: String },
    preferredContract: { type: String },
    pricing: { type: String },
    imageLink: { type: String },
    averagePrice: { type: String },
    timeLine: { type: String },
    condition: { type: String }
});

module.exports = mongoose.model("ListedFarmEquipments", ListedFarmEquipments);
