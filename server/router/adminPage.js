const express = require('express');
const router = express.Router();
const controller = require('./../controller/admin');

router.get('/', controller.guideCardList);
router.put('/cancellation', controller.changeStateCanceled);

module.exports = router;
