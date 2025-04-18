const  { findAll, findByUrl, createRecord, editRecord, findById } = require('./index.js');
const router = require('express').Router();

router.route('/')
    .get(findAll)
    .post(createRecord);

router.route('/:url')
    // .put(editMeta)
    // .delete(removeMeta)
    .get(findByUrl);

router.route('/by/id/:id')
    .get(findById);

router.route('/edit/:id')
    .put(editRecord);

module.exports = router;