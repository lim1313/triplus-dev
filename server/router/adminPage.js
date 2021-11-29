const express = require('express');
const router = express.Router();
const controller = require('./../controller/admin');

router.get('/', controller.example);

router.put('/change-state-approved', controller.changeStateApproved);
router.put('/change-state-rejected', controller.changeStateRejected);
router.put('/change-state-completed', controller.changeStateCompleted);
router.put('/change-state-canceled', controller.changeStateCanceled);

module.exports = router;