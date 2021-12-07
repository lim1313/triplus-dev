const express = require('express');
const router = express.Router();
const controller = require('./../controller/chatting');

router.get('/', controller.example);
router.get('/rooms', controller.findChatRoomByUserId);

module.exports = router;