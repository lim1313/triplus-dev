const express = require('express');
const router = express.Router();
const controller = require('./../controller/map');

router.get('/', controller.selectGuideCard);
router.get('/guide-card', controller.selectGuideCardById)

module.exports = router;