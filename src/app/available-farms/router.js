const  { findAll, findByUrl, createRecord, editRecord, addLand, reduceLand, findByCountry, fetchByUuid, findFarmById, findFarmBySerialNo } = require('./index.js');
const router = require('express').Router();

router.route('/')
    .get(findAll)
    .post(createRecord);

router.route('/add/land/:id')
    .put(addLand);

router.route('/reduce/land/available/:id')
    .put(reduceLand);

router.route('/fetch/farm/by/selected/country')
    .post(findByCountry);


router.route('/:url')
    .get(findByUrl);

router.route('/serial-no/:serialNo')
    .get(findFarmBySerialNo);

router.route('/get-by-id/:id')
    .get(findFarmById);

router.route('/edit/:id')
    .put(editRecord);


router
.route("/query/:id")
.get(fetchByUuid);

module.exports = router;