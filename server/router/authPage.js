const express = require('express');
const router = express.Router();
const controller = require('./../controller/oauth');

router.get('/google', controller.google);
router.post('/googlecallback', controller.googlecallback);
router.get('/naver', controller.naver);
router.post('/navercallback', controller.navercallback);
router.get('/kakao', controller.kakao);
router.post('/kakaocallback', controller.kakaocallback);

module.exports = router;
