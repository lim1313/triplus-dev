const express = require('express');
const router = express.Router();
const controller = require('./../controller/management');
const fileManagement = require('./../controller/functions/fileManagement');

router.get('/', controller.example);
router.post('/guide-card', fileManagement.upload.array('file'), controller.createGuideCard);
router.put('/guide-card', controller.updateGuideCard);
router.put('/change-state-approved', controller.changeStateApproved);
router.put('/change-state-rejected', controller.changeStateRejected);
router.put('/change-state-completed', controller.changeStateCompleted);
router.put('/change-state-canceled', controller.changeStateCanceled);
router.get('/guide', controller.selectGuideCardByUserId);
router.get('/tourlist/all', controller.selectGuideCardForTour);
router.get('/tourlist/expected', controller.selectGuideCardForTour);
router.get('/tourlist/completed', controller.selectGuideCardForTour);

module.exports = router;
