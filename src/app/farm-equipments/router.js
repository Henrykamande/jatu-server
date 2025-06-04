const  { findAllListedEquipments,deleteSelectedEquipment, updateListedEquipment, findEquipmentsBySerialNo,findEquipmentsById, createListedEquiment } = require('./index.js');
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

router.route('/fetched-by-id/:id')
    .get(findEquipmentsById)

module.exports = router;