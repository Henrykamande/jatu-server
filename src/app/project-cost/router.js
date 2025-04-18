const {
  findAll,
  findCosts,
  createRecord,
  updateRecord,
  deleteRecord,
  findCostsByUrl,
  findZoneCosts,
  findZoneCostsWeb,
  findItemCosts
} = require("./index.js");
const router = require("express").Router();

router.route("/").get(findAll).post(createRecord);

router.route("/by/url/:url").get(findCostsByUrl);

router.route("/fetch/costs/:project/:country/:zone").get(findZoneCosts);

router.route("/fetch/costs/web/:project/:country/:zone/:acres").get(findZoneCostsWeb);

router.route("/fetch/item/costs/:project/:country/:zone/:costitem").get(findItemCosts);

router.route("/:id").put(updateRecord).delete(deleteRecord).get(findCosts);

// router.route('/edit/:id')
//     .put(editMeta);

module.exports = router;
