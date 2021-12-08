const express = require('express');
const router = express.Router();
const controller = require('./../controller/my');

router.post('/emailCheck', controller.emailCheck);

module.exports = router;
