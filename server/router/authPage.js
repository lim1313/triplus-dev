const express = require('express');
const router = express.Router();
const controller = require('./../controller/oauth');

router.post('/google', controller.google);
router.get('/naver', controller.naver);
router.post('/navercallback', controller.navercallback);
module.exports = router;
