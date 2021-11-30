const nodemailer = require('nodemailer');

const stmpTransport = nodemailer.createTransport({
  service: 'Naver',
  auth: {
    user: 'william9563@naver.com',
    pass: 'ks0512**99',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  stmpTransport,
};
