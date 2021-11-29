const express = require('express');
const router = express.Router();
const controller = require('./../controller/management');

router.get('/', controller.example);
router.post('/guide-card', controller.createGuideCard);
router.put('/guide-card', controller.updateGuideCard);
router.post('/change-state-approved', controller.changeStateApproved);
router.post('/change-state-rejected', controller.changeStateRejected);
router.post('/change-state-completed', controller.changeStateCompleted);
router.post('/change-state-canceled', controller.changeStateCanceled);

module.exports = router;