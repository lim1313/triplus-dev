const { isAuthorized, updateUser, expiredUser, changePassword } = require('./functions/user');
const crypto = require('crypto');
const { user, user_verify } = require('../models');
const { stmpTransport } = require('../config/email');

module.exports = {
  emailCheck: async (req, res) => {
    const accessToken = isAuthorized(req);
    //! 유효하지 않은 토큰
    if (!accessToken) return res.status(401).json({ message: '유효하지 않은 유저입니다' });

    const { userId } = accessToken;
    const email = req.body.data;

    try {
      let userVierify = await user_verify.findOne({ where: { user_id: userId } });

      if (userVierify.dataValues.email_verified) {
        const key1 = crypto.randomBytes(256).toString('hex').substr(100, 6);
        const randomNum = parseInt(key1, 16);

        await user_verify.update({ verify_key: randomNum, email }, { where: { user_id: userId } });

        let mailOpt = {
          from: process.env.AUTH_EMAIL,
          to: email,
          subject: '[triplus] 이메일 인증 번호',
          html: `<div style="text-align: center; margin: 30px">
          <h2>안녕하세요. ${userId}님. triplus 이메일 변경을 위한 인증번호입니다.</h2>
          <h3>이메일 인증을 위해 아래의 <b><span style="color: #fa4b62;">인증번호</span></b>를 기입하세요.</h3>
              <div style="padding: 30px; color: #3386f7;"><span style="font-size: 30px; font-weight:700;">${randomNum}</span>
            </div>
          <p style="
              padding: 30px;"><img src="https://triplus-deploy.s3-ap-northeast-2.amazonaws.com/asset/logo/logo.png" width="500px" alt="triplus 로고"></p>
          </div>`,
        };

        stmpTransport.sendMail(mailOpt, (err, emailRes) => {
          if (err) {
            console.log(err);
            res.status(400).json({ message: '인증 이메일 발송 실패' });
          } else {
            console.log('----success----');
            res.status(200).json({ message: '인증 이메일 발송 완료' });
          }
          console.log('res', emailRes);
          return stmpTransport.close();
        });
      }
    } catch (err) {
      console.error(err);
    }
  },
  emailUnCheck: async (req, res) => {
    const accessToken = isAuthorized(req);
    if (!accessToken) return res.status(401).json({ message: '유효하지 않은 유저입니다' });
    const { userId } = accessToken;

    try {
      await user_verify.update({ email_verified: 1 }, { where: { user_id: userId } });
      return res.sendStatus(200);
    } catch (err) {
      console.error(err);
    }
  },

  myInfo: (req, res) => {
    try {
      const accessToken = isAuthorized(req);
      
      if(!accessToken){
        throw '다시 로그인하여 주세요'
      }else{
        res.status(200);
      }
    } catch (error) {
      console.log(error);
      res.status(401).send(error);
    }
  },

  updateUser: async (req, res) => {
    const resObject = await updateUser(req);
    res.status(resObject['code']).send(resObject['message']);
  },

  expiredUser: async (req, res) => {
    const resObject = await expiredUser(req);
    res.status(resObject.code).send(resObject.message);
  },

  changePassword: async (req, res) => {
    const resObject = await changePassword(req);
    res.status(resObject.code).send(resObject.message);
  },
};
