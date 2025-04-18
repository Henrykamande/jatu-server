const {
  findAll,
  findByUrl,
  createRecord,
  createComment,
  updateRecord,
  deleteRecord,
  createAttachment,
  deleteAttachment,
} = require("./index.js");
const router = require("express").Router();

router.route("/").get(findAll).post(createRecord);

router.route("/create/attachment").post(createAttachment);

router.route("/comments").post(createComment);

router.route("/delete/attachment").post(deleteAttachment);

router.route("/:id").put(updateRecord).delete(deleteRecord).get(findByUrl);

// router.route('/edit/:id')
//     .put(editMeta);

module.exports = router;
