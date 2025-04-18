const {
  findAll,
  activeProjects,
  findByUrl,
  findById,
  fetchbyCategory,
  createRecord,
  updateRecord,
  updateStatus,
  deleteRecord,
} = require("./index.js");
const router = require("express").Router();

router.route("/").get(findAll).post(createRecord);

router.route("/query/active").get(activeProjects);

router.route("/fetch/:id").get(findById);
router.route("/fetch-by-category/:id").get(fetchbyCategory);

router.route("/:id").put(updateRecord).delete(deleteRecord).get(findByUrl);

router.route('/edit/status/:id')
    .put(updateStatus);

module.exports = router;
