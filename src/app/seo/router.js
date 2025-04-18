const  { findAll, findByUrl, findByCategory,  createRecord, updateRecord } = require('./index.js');
const router = require('express').Router();

router.route('/')
    .get(findAll)
    .post(createRecord);

router.route('/:id')
    // .put(editMeta)
    // .delete(removeMeta)
    .get(findByUrl);

router.route('/query/category/:url')
    .get(findByCategory);

router.route('/edit/:id')
    .put(updateRecord);
    
module.exports = router;