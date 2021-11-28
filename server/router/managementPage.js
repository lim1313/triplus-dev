const express = require('express');
const router = express.Router();
const controller = require('./../controller/management');

router.get('/', controller.example);
router.post('/guide-card', controller.createGuideCard);

module.exports = router;