const  { register, findAll, login } = require('./index.js');
const router = require('express').Router();

router.route('/')
    .get(findAll)
    .post(register);

// router.route('/:id')
//     .put(editData)
//     .get(findById);

router.route('/login')
    .post(login);

module.exports = router;