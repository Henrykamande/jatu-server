var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  location: { type: String },
  house: { type: String },
  role: { type: Number },
  password: { type: String },
  serialNo: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
