const { isAuthorized } = require('./functions/user');
const crypto = require('crypto');
const { user, user_verify } = require('../models');
const { stmpTransport } = require('../config/email');

module.exports = {
  example: async (req, res) => {
    console.log('exmaple');
    return res.sendStatus(200);
  },
  emailCheck: async (req, res) => {
    const accessToken = isAuthorized(req);
    //! 유효하지 않은 토큰
    if (!accessToken) return res.status(401).json({ message: '유효하지 않은 유저입니다' });

    const { userId } = accessToken;
    const email = req.body.data;

    try {
      let userVierify = await user_verify.findOne({ where: { user_id: userId } });

      if (userVierify.dataValues.email_verified) {
        //인증 이메일 발송
        let key_one = crypto.randomBytes(256).toString('hex').substr(100, 5);
        let key_two = crypto.randomBytes(256).toString('base64').substr(50, 5);
        let key_for_verify = key_one + key_two;

        await user_verify.update({ verify_key: key_for_verify }, { where: { user_id: userId } });

        let url =
          'http://' +
          req.get('host') +
          '/change-email' +
          '?key=' +
          key_for_verify +
          '&email=' +
          email;
        let mailOpt = {
          from: process.env.AUTH_EMAIL,
          to: email,
          subject: '[triplus] 이메일 변경 인증',
          html: `<div style="text-align: center; margin: 30px">
          <h2>이메일 인증을 위해 아래의 <b><span style="color: #fa4b62;">이메일 인증</span></b>버튼을 클릭해주세요.</h2>
          <h2>이메일 인증버튼을 누른 후, 마이페이지에서 <b><span style="color: #fa4b62;">완료버튼</span></b>을 눌러주세요.</h2>
            <a href=${url}>
              <button style="
              background: #3386f7;
              border: 1px solid #3386f7;
              color: #e9edf3;
              cursor: pointer;
              border-radius: 5px;
              padding: 10px;
              margin-bottom: 20px;
              line-height:20px;
              height: 40px;
              "><span style="font-size: 20px";>이메일 인증</span></button>
            </a>
          <p><img src="https://triplus-deploy.s3-ap-northeast-2.amazonaws.com/asset/logo/logo.png" width="500px" alt="triplus 로고"></p>
          </div>`,
        };

        stmpTransport.sendMail(mailOpt, (err, emailRes) => {
          if (err) {
            console.log(err);
            //! 이메일 전송 실패
            res.status(400).json({ message: '인증 이메일 발송 실패' });
          } else {
            console.log('----success----');
            //! 이메일 전송 성공
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
    //! 유효하지 않은 토큰
    if (!accessToken) return res.status(401).json({ message: '유효하지 않은 유저입니다' });
    const { userId } = accessToken;

    try {
      await user_verify.update({ email_verified: 1 }, { where: { user_id: userId } });
      return res.sendStatus(200);
    } catch (err) {
      console.error(err);
    }
  },
};
