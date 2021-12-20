const express = require('express');
const router = express.Router();
const controller = require('./../controller/main');

router.get('/', controller.isLogin);

module.exports = router;
