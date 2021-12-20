const express = require('express');
const router = express.Router();
const controller = require('./../controller/functions/fileManagement');

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

const s3 = new AWS.S3({
  accessKeyId: process.env.TRIPLUS_S3_ACCESS_KEY,
  secretAccessKey: process.env.TRIPLUS_S3_SECRET_ACCESS_KEY,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.TRIPLUS_S3_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, `asset/images/` + Date.now().toString() + file.originalname);
    },
    acl: 'public-read-write'
  })
});

module.exports = router;