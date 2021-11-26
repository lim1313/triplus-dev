const express = require('express');
const router = express.Router();
const controller = require('./../controller/main');

router.get('/', controller.example);

module.exports = router;