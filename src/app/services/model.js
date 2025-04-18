var mongoose = require("mongoose");

var ServiceSchema = new mongoose.Schema({
  title: { type: String },
  h1: { type: String },
  h2: { type: String },
  position: { type: String },
  introText: { type: String },
  content: { type: String },
  coverImage: { type: String },
  otherImages: { type: Array },
  metaTitle: { type: String },
  metaDescription: { type: String },
  url: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("Service", ServiceSchema);
