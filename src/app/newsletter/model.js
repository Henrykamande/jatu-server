var mongoose = require("mongoose");

var NewsletterSchema = new mongoose.Schema({
  newsletterEmail: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("Newsletter", NewsletterSchema);
