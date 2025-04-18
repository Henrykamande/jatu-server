const {
  findAll,
  findByUrl,
  createRecord,
  editRecord,
  findByCountry,
  findWatches,
  findProjectSeasons,
  deleteRecord
} = require("./index.js");
const router = require("express").Router();

router.route("/").get(findAll).post(createRecord);

router
  .route("/:url")
  // .put(editMeta)
  // .delete(removeMeta)
  .get(findByUrl);

router
  .route("/delete/:id")
  .delete(deleteRecord)

router
  .route("/by/country/:id")
  // .put(editMeta)
  // .delete(removeMeta)
  .get(findByCountry);

router
  .route("/find/:project/:country")
  .get(findWatches);

router
  .route("/query/by/:country/:project")
  .get(findProjectSeasons);

router.route("/edit/:id").put(editRecord);

module.exports = router;
