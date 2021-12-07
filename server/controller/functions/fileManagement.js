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
      let extension = path.extname(file.originalname);
      cb(null, `asset/images/` + Date.now().toString() + extension);
    },
    acl: 'public-read-write'
  })
});

module.exports = {
  fileUploadMulti: (req, res) => {
    console.log(req.files);
    console.log(req.body);

    res.status(200).send('등록완료 후, 작업 시작');
  },
  upload,
}
