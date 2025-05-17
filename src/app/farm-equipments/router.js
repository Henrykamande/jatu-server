const  { findAllListedEquipments,deleteSelectedEquipment, updateListedEquipment, findEquipmentsBySerialNo, createListedEquiment } = require('./index.js');
const router = require('express').Router();

router.route('/')
    .get(findAllListedEquipments)
    .post(createListedEquiment);

router.route('/delete/:id')
    .delete(deleteSelectedEquipment)
    .put(updateListedEquipment);

router.route('/update/:id')
    .put(updateListedEquipment);

router.route('/fetched-by-userSerialNo/:userSerialNo')
    .get(findEquipmentsBySerialNo)

module.exports = router;