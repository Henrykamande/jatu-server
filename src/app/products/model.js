var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var ProductSchema = new mongoose.Schema({
  name: { type: String },
  content: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category", default: null },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
    default: null,
  },
  brand: { type: Schema.Types.ObjectId, ref: "Brand", default: null },
  category_url: String,
  subcategory_url: String,
  brand_url: String,
  country: String,
  alcohol: Number,
  meta_title: String,
  meta_desc: String,
  cover_image: { type: String },
  otherImages: { type: Array },
  otherImages: { type: Array },
  prices: { type: Array },
  currentPrice: Number,
  previousPrice: Number,
  giftpack: { type: Boolean, default: false },
  offer: { type: Boolean, default: false },
  outOfStock: { type: Boolean, default: false },
  clearance: { type: Boolean, default: false },
  trending: { type: Boolean, default: false },
  url: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("Product", ProductSchema);
