var mongoose = require("mongoose");

var ProjectSchema = new mongoose.Schema({
  title: { type: String },
  h1: { type: String },
  h2: { type: String },
  CattleProject: { type: String, default: "N" },
  position: { type: String },
  introText: { type: String },
  metaTitle: { type: String },
  content: { type: String },
  sec_one: { type: String },
  sec_two: { type: String },
  insurance: { type: String },
  projectCategory:{ type: String },
  countries: { type: Array },
  coverImage: { type: String },
  otherImages: { type: Array },
  relatedProjects: { type: Array },
  url: { type: String, unique: true, required: true },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model("Project", ProjectSchema);
