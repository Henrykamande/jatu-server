const  { createRecord, findAllApplications } = require('./index.js');
const router = require('express').Router();

router.route('/')
    .get(findAllApplications)
    .post(createRecord);

module.exports = router;