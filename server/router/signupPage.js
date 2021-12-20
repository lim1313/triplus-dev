const express = require('express');
const router = express.Router();
const controller = require('./../controller/siginup');

router.get('/', controller.idcheck);
router.get('/email-check', controller.emailCheck);
router.post('/', controller.signup);

module.exports = router;
