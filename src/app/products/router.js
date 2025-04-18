const {
  findAll,
  findByUrl,
  findByCategory,
  subcategoryProducts,
  offerProducts,
  clearanceProducts,
  trendingProducts,
  createRecord,
  updateRecord,
  updateSection,
  findGiftPacks,
  findByBrand,
  search,
  deleteProduct,
  filterByCategory,
  updateStatus,
} = require("./index.js");
const router = require("express").Router();

router.route("/").get(findAll).post(createRecord);

router.route("/fetch/offers").get(offerProducts);

router.route("/fetch/trending").get(trendingProducts);

router.route("/fetch/clearance").get(clearanceProducts);

router.route("/get/giftpacks").get(findGiftPacks);

// filters
router.route("/filter").post(filterByCategory);

router
  .route("/:id")
  // .put(editMeta)
  .delete(deleteProduct)
  .get(findByUrl);

router.route("/brand/:url").get(findByBrand);

router.route("/search/:keyword").get(search);

router.route("/query/category/:url").get(findByCategory);

router.route("/query/category/:category").get(subcategoryProducts);

router.route("/edit/:id").put(updateRecord);

router.route("/update/section/:id").put(updateSection);

router.route("/update/stock/status/:id").put(updateStatus);

module.exports = router;
