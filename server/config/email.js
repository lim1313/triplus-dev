const nodemailer = require('nodemailer');
require('dotenv').config();

const stmpTransport = nodemailer.createTransport({
  service: 'Naver',
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  stmpTransport,
};
