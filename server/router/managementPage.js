const express = require('express');
const router = express.Router();
const controller = require('./../controller/management');

router.get('/', controller.example);
router.post('/guide-card', controller.createGuideCard);
router.put('/guide-card', controller.updateGuideCard);
router.put('/change-state-approved', controller.changeStateApproved);
router.put('/change-state-rejected', controller.changeStateRejected);
router.put('/change-state-completed', controller.changeStateCompleted);
router.put('/change-state-canceled', controller.changeStateCanceled);

module.exports = router;