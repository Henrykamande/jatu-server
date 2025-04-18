const {
  findAll,
  findByUrl,
  createRecord,
  editRecord,
  findByCountry,
  findWatches,
  findZonePrice,
  findByDate,
  findByDateWeb,
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
  .route("/by/country/:id")
  // .put(editMeta)
  // .delete(removeMeta)
  .get(findByCountry);

router
  .route("/find/:project/:country")
  .get(findWatches);

router
  .route("/find/selected/zonal/price")
  .post(findZonePrice);

router
  .route("/find/by/date")
  .post(findByDate);

router
  .route("/find/by/date/web")
  .post(findByDateWeb);


router
  .route("/zone/select/:project/:zone")
  .get(findByZoneProject);


router.route("/edit/:id").put(editRecord);

module.exports = router;
