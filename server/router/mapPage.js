const express = require('express');
const router = express.Router();
const controller = require('./../controller/map');

router.get('/', controller.example);

module.exports = router;