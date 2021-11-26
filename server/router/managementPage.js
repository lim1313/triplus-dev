const express = require('express');
const router = express.Router();
const controller = require('./../controller/management');

router.get('/', controller.example);

module.exports = router;