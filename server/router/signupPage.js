const express = require('express');
const router = express.Router();
const controller = require('./../controller/siginup');

router.get('/', controller.idcheck);
router.post('/', controller.signup);

module.exports = router;
