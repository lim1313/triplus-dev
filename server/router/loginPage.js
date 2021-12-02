const express = require('express');
const router = express.Router();
const controller = require('./../controller/login');

router.post('/', controller.login);
router.get('/', controller.checkToken);

module.exports = router;
