const express = require('express');
const router = express.Router();
const controller = require('./../controller/my');

router.post('/email-check', controller.emailCheck);
router.post('/email-unCheck', controller.emailUnCheck);
router.get('/', controller.myInfo);
router.post('/nick-name', controller.updateUser);
router.post('/region', controller.updateUser);
router.post('/email', controller.updateEmail);
router.post('/withdraw', controller.expiredUser);
router.post('/profile', controller.updateUser);
router.delete('/profile', controller.updateUser);
router.put('/password', controller.changePassword);

module.exports = router;
