const { findAll, findByUrl, createRecord, editRecord, fetchByUuid, joinEvent } = require("./index.js");
const router = require("express").Router();

router.route("/").get(findAll).post(createRecord);

router
  .route("/:url")
  .get(findByUrl);

router.get("/query/:id", fetchByUuid);

router.post("/join/event", joinEvent);

router.route("/edit/:id").put(editRecord);

module.exports = router;
