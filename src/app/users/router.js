const  { register, findAll, findUserBySerialNo, login } = require('./index.js');
const router = require('express').Router();

router.route('/')
    .get(findAll)
    .post(register);

router.route('/serial-no/:serialNo')
    .get(findUserBySerialNo);

router.route('/login')
    .post(login);

module.exports = router;