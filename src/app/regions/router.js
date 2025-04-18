const {
  findAll,
  findByUrl,
  createRecord,
  editRecord,
  findByCountry,
  zonalDefinition
} = require("./index.js");
const router = require("express").Router();

router.route("/").get(findAll).post(createRecord);

router
  .route("/:url")
  // .put(editMeta)
  // .delete(removeMeta)
  .get(findByUrl);

router
  .route("/by/country/:id")
  // .put(editMeta)
  // .delete(removeMeta)
  .get(findByCountry);

router
  .route("/zonal/:project/:country")
  .get(zonalDefinition);


router.route("/edit/:id").put(editRecord);

module.exports = router;
