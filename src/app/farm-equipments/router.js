const  { findAllListedEquipments, createListedEquiment } = require('./index.js');
const router = require('express').Router();

router.route('/')
    .get(findAllListedEquipments)
    .post(createListedEquiment);

module.exports = router;