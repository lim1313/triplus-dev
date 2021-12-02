const express = require('express');
const router = express.Router();
const controller = require('./../controller/functions/s3');

router.post('/guide-image', controller.upload);