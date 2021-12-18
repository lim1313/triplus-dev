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
      .findOne({ where: { userId } })
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
    const key1 = crypto.randomBytes(256).toString('hex').substr(100, 4);
    const randomNum = parseInt(key1, 16);
    const nickname = '여행자' + randomNum;
    user
      .findOrCreate({
        where: { userId },
        defaults: { userId, password: hashPw, email, role: 'general', nickName: nickname },
      })
      .then(([data, created]) => {
        if (created) {
          let key_one = crypto.randomBytes(256).toString('hex').substr(100, 5);
          let key_two = crypto.randomBytes(256).toString('base64').substr(50, 5);
          let key_for_verify = key_one + key_two;
          user_verify.create({ user_id: userId, verify_key: key_for_verify });

          let url =
            'http://' +
            req.get('host') +
            '/confirmEmail' +
            '?key=' +
            encodeURIComponent(key_for_verify);
          let mailOpt = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: '안녕하세요 triplus입니다!',
            html: `<div style="text-align: center; margin: 30px">
            <h2>안녕하세요. ${userId}님. 이메일 인증을 위해 아래의 여행 시작하기 버튼을 눌러주세요</h2>
            <a href=${url}><button style="background: #3386f7;
              border: 1px solid #3386f7;
              color: #e9edf3;
              padding: 30px;
              cursor: pointer;
              font-size: 28px;
              border-radius: 5px;
              ">여행시작하기</button></a>
            <p style="
                padding: 30px;"><img src="https://triplus-deploy.s3-ap-northeast-2.amazonaws.com/asset/logo/logo.png" width="500px" alt="triplus 로고"></p>
            </div>`,
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
