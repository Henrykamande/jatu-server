const {
  findAll,
  findByUrl,
  createRecord,
  editRecord,
  deleteCategory,
} = require("./index.js");
const router = require("express").Router();

router.route("/").get(findAll).post(createRecord);

router.route("/:url").get(findByUrl);

router.route("/delete/:url").delete(deleteCategory);


router.route("/edit/:id").put(editRecord);

module.exports = router;
