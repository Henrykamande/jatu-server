const {
  findAll,
  findByUrl,
  createRecord,
  editRecord,
  findSubs,
  subCategories,
} = require("./index.js");
const router = require("express").Router();

router.route("/").get(findAll).post(createRecord);

router
  .route("/:url")
  // .put(editMeta)
  // .delete(removeMeta)
  .get(findByUrl);

router.route("/select/:url").get(findSubs);

router.route("/query/:url").get(subCategories);

router.route("/edit/:id").put(editRecord);

module.exports = router;
