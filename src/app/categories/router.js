const {
  findAll,
  findByUrl,
  createRecord,
  editRecord,
  autofillRecords,
  filterBrands,
  deleteCategory,
} = require("./index.js");
const router = require("express").Router();

router.route("/").get(findAll).post(createRecord);

router.route("/:url").get(findByUrl);

router.route("/delete/:url").delete(deleteCategory);

router.route("/autofill/data/:url").get(autofillRecords);

router.route("/autofill/filter/brands/:url").get(filterBrands);

router.route("/edit/:id").put(editRecord);

module.exports = router;
