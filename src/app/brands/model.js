var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var BrandSchema = new mongoose.Schema({
  name: { type: String },
  url: { type: String, unique: true, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", default: null },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
    default: null,
  },
  categoryUrl: { type: String },
  subcategoryUrl: { type: String },
  image_path: { type: String },
});

module.exports = mongoose.model("Brand", BrandSchema);
