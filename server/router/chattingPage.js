const express = require('express');
const router = express.Router();
const controller = require('./../controller/chatting');

router.post('/rooms', controller.createChatRoom);

module.exports = router;
