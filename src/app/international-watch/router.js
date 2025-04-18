const {
  findAll,
  findByUrl,
  createRecord,
  editRecord,
  findByProject,
  findByProjectUrl,
  findWatches,
  findByDate,
  findByDateUrl,
  findByZoneProject,
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
  .route("/delete/zone/:id")
  .delete(deleteRecord);

router
  .route("/by/project/:url")
  // .put(editMeta)
  // .delete(removeMeta)
  .get(findByProject);

  router
  .route("/by/project/url/:url")
  // .put(editMeta)
  // .delete(removeMeta)
  .get(findByProjectUrl);


router
  .route("/zone/select/:project/:zone")
  .get(findByZoneProject);

router
  .route("/query/by/date/:project/:date")
  .get(findByDate);

router
  .route("/query/by/date/url/:project/:date")
  .get(findByDateUrl);


router.route("/edit/:id").put(editRecord);

module.exports = router;
