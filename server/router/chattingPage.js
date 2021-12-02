const express = require('express');
const router = express.Router();
const controller = require('./../controller/chatting');

router.get('/', controller.example);

module.exports = router;