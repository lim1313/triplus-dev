require('dotenv').config();
// const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { user, user_verify } = require('../models');
const { stmpTransport } = require('../config/email');
const { genSalt, hash, hashPassword } = require('./functions/secure');
module.exports = {
  idcheck: (req, res) => {
    const { userId } = req.query;
    user
      .findOne({ where: { user_id: userId } })
      .then((data) => {
        if (data) {
          return res.json({ success: false, message: '사용이 불가능한 아이디입니다' });
        } else {
          return res.json({ success: true, message: '사용이 가능한 아이디입니다' });
        }
      })
      .catch((err) => console.log(err));
  },
  emailCheck: (req, res) => {
    const { userEmail } = req.query;
    user
      .findOne({ where: { email: userEmail } })
      .then((data) => {
        if (data) {
          return res.json({ success: false, message: '사용이 불가능한 이메일입니다' });
        } else {
          return res.json({ success: true, message: '사용이 가능한 이메일입니다' });
        }
      })
      .catch((err) => console.log(err));
  },
  signup: async (req, res) => {
    const { userId, password, email } = req.body;
    const hashPw = await hashPassword(password);
    user
      .findOrCreate({
        where: { user_id: userId },
        defaults: { user_id: userId, password: hashPw, email, role: 'general' },
      })
      .then(([data, created]) => {
        if (created) {
          let key_one = crypto.randomBytes(256).toString('hex').substr(100, 5);
          let key_two = crypto.randomBytes(256).toString('base64').substr(50, 5);
          let key_for_verify = key_one + key_two;
          user_verify.create({ user_id: userId, verify_key: key_for_verify });

          let url = 'http://' + req.get('host') + '/confirmEmail' + '?key=' + key_for_verify;
          let mailOpt = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: '안녕하세요 triplus입니다!',
            html: `
            <h1>이메일 인증을 위해 '여행시작하기'를 클릭해주세요</h1><br>
            <a href=${url}><button style="background: #3386f7;
              border: 1px solid #3386f7;
              color: #e9edf3;
              padding: 10px;
              cursor: pointer;
              font-size: 28px;
              border-radius: 5px;
              ">여행시작하기</button></a>`,
          };
          stmpTransport.sendMail(mailOpt, (err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log('success');
            }
            stmpTransport.close();
          });
          res.json({ success: true, message: '회원가입이 완료되었습니다.' });
        }
      })
      .catch((err) => console.log(err));
  },
};
