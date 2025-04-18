const {
  findAll,
  findByUrl,
  createRecord,
  editRecord,
  editZones,
  findByCountry,
  findZones,
  projectsZones,
  projectsZonesByUrl,
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
  .route("/find/:country/:project")
  .get(findZones);

router
  .route("/query/data/:country/:project")
  .get(projectsZones);

router
  .route("/query/data/url/:country/:project")
  .get(projectsZonesByUrl);

  router.route("/edit").put(editZones);

router.route("/edit/:id").put(editRecord);

module.exports = router;
