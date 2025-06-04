const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define your schema here
const EquipmentApplicationsSchema = new Schema({
  // your schema fields
  countryAt: { type: String },
  SerialNo: { type: Schema.Types.ObjectId, ref: "ListedFarmEquipments", default: null },
  region: { type: String },
  district: { type: String },
  ward: { type: String },
  village: { type: String },
  farmCode: { type: String },
  farmSize: { type: Number },
  projectType: { type: String },
  farmingSchedule: { type: String },
  user: {
    first_name: String,
    last_name: String,
    _id: Schema.Types.ObjectId,
    email: String,
    phone: String,
    serialNo: String
  },
  equipmentToRent: {
    _id: Schema.Types.ObjectId,
    userSerialNo: String,
    serialNo: String,
    machineType: String,
    imageLink: String,
    make: String,
    model: String,
    capacity: String,
    driveType: String,
    mainUse: String,
    countryAt: String,
    region: String,
    district: String,
    ward: String,
    village: String,
    preferredContract: String,
    pricing: String,
    averagePrice: String,
    condition: String,
    timeLine: String,
    __v: Number
  }
});

// Create and export model
const EquipmentApplications = mongoose.model('EquipmentApplications', EquipmentApplicationsSchema);

module.exports = EquipmentApplications;
