const express = require('express');
const router = express.Router();
const controller = require('./../controller/my');

router.post('/email-check', controller.emailCheck);
router.post('/email-unCheck', controller.emailUnCheck);

module.exports = router;
