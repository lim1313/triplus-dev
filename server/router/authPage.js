const express = require('express');
const router = express.Router();
const controller = require('./../controller/oauth');

router.post('/google', controller.google);

module.exports = router;
