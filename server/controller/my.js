const { isAuthorized } = require('./functions/user');
const crypto = require('crypto');
const { user, user_verify } = require('../models');
const { stmpTransport } = require('../config/email');

module.exports = {
  emailCheck: async (req, res) => {
    const accessToken = isAuthorized(req);
    //! 유효하지 않은 토큰
    if (!accessToken) return res.status(401).json({ message: '유효하지 않은 유저입니다' });
    const { userId, email } = accessToken;

    try {
      let userVierify = await user_verify.findOne({ where: { user_id: userId } });

      if (userVierify.dataValues.email_verified) {
        //인증 이메일 발송
        let key_one = crypto.randomBytes(256).toString('hex').substr(100, 5);
        let key_two = crypto.randomBytes(256).toString('base64').substr(50, 5);
        let key_for_verify = key_one + key_two;

        await user_verify.update({ verify_key: key_for_verify }, { where: { user_id: userId } });

        let url = 'http://' + req.get('host') + '/changeEmail' + '?key=' + key_for_verify;
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

        stmpTransport.sendMail(mailOpt, (err, emailRes) => {
          if (err) {
            console.log(err);
            //! 이메일 전송 실패
            return res.status(500).json({ message: '인증 이메일 발송 실패' });
          } else {
            console.log('----success----');
            //! 이메일 전송 성공
            return res.status(200).json({ message: '인증 이메일 발송 완료' });
          }
          console.log('res', emailRes);
          stmpTransport.close();
        });
      } else {
        //! 유효하지 않은 유저 (이메일 인증이 없음)
        return res.status(401).json({ message: '이메일 인증이 없는 유저' });
      }
    } catch (err) {
      console.error(err);
    }
  },
};

//* 이메일 인증
// 1. 수정할 이메일 기입
// 2. '인증' 버튼 클릭
// => post /my/emailCheck => 본인인증(accessToken) =>
// => verify_key 재할당
// => 인증 이메일 발송
// 1) => 인증 클릭했다면 => user_verify의 email_verified = "2" 할당 => 유효한 변경 이메일로 인증됨
//  email_verified를 2로 한 이유 => 변경 중간에 유저가 이메일 변경을 마치지 않거나 해도 로그인은 가능한 상태로 두기 위함
// 2) => 인증 클릭하지 않았다면 => verify_key만 새로 생성된 상태이므로 문제되지 않음.
// 3. 유저가 완료 버튼을 통해 post 요청하여 최종 email변경 수행

// 최종적으로 유저가 완료를 눌러 post를 해야 email 변경이 완료됨
// 즉, eamil_verified가 2인 상태에서 post 요청 성공 시 email 변경 완료
