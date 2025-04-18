const {
  findAll,
  findCosts,
  createRecord,
  updateRecord,
  deleteRecord,
  findCostsByUrl,
} = require("./index.js");
const router = require("express").Router();

router.route("/").get(findAll).post(createRecord);

router.route("/by/url/:url").get(findCostsByUrl);

router.route("/:id").put(updateRecord).delete(deleteRecord).get(findCosts);

// router.route('/edit/:id')
//     .put(editMeta);

module.exports = router;
