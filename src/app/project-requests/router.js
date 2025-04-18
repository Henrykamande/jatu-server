const {
  findAll,
  createRecord,
  updateRecord,
  deleteRecord,
} = require("./index.js");
const router = require("express").Router();

router.route("/").get(findAll).post(createRecord);

// router.route("/by/url/:url").get(findCostsByUrl);

router.route("/:id").put(updateRecord).delete(deleteRecord);

// router.route('/edit/:id')
//     .put(editMeta);

module.exports = router;
