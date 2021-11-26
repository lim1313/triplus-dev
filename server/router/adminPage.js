const express = require('express');
const router = express.Router();
const controller = require('./../controller/admin');

router.get('/', controller.example);

module.exports = router;