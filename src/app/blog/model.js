var mongoose = require("mongoose");

var BlogSchema = new mongoose.Schema({
  title: { type: String },
  metaTitle: { type: String },
  videoStatus: { type: Boolean, default: false },
  videoUrl: { type: String },
  h1: { type: String },
  h2: { type: String },
  introText: { type: String },
  metaTitle: { type: String },
  metaDescription: { type: String },
  content: { type: String },
  coverImage: { type: String },
  otherImages: { type: Array },
  url: { type: String, unique: true, required: true },
  comments: [],
  attachments: { type: Array },
});

module.exports = mongoose.model("Blog", BlogSchema);
