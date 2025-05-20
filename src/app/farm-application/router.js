const  { createRecord, findAllApplications, editFarmApplicantsRecord, deleteFarmApplicantsRecord, findFarmApplicantsRecord } = require('./index.js');
const router = require('express').Router();

router.route('/')
    .get(findAllApplications)
    .post(createRecord);

router.route('/:userSerialNo')
    .get(findFarmApplicantsRecord)
    .put(editFarmApplicantsRecord)
    .delete(deleteFarmApplicantsRecord)

module.exports = router;