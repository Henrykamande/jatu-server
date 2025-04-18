const {
  findAll,
  findByUrl,
  createRecord,
  updateRecord,
  deleteRecord,
} = require("./index.js");
const router = require("express").Router();

router.route("/").get(findAll).post(createRecord);

router.route("/:id").put(updateRecord).delete(deleteRecord).get(findByUrl);

// router.route('/edit/:id')
//     .put(editMeta);

module.exports = router;
