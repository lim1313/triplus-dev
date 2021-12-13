require('dotenv').config();
const bcrypt = require('bcrypt');
const { user, user_verify } = require('../models');
const { generateAccessToken, sendAccessToken, isAuthorized } = require('./functions/user');

module.exports = {
  login: async (req, res) => {
    const { userId, password, isAdmin } = req.body;
    if (isAdmin) {
      if (!userId) return res.json({ success: false, message: '아이디를 입력해주세요' });
      if (!password) return res.json({ success: false, message: '비밀번호를 입력해주세요' });
      try {
        const userInfo = await user.findOne({ where: { userId } });
        if (!userInfo) {
          return res.json({ success: false, message: '아이디 또는 비밀번호가 잘못되었습니다' });
        }
        const match = await bcrypt.compare(password, userInfo.dataValues.password);
        if (!match) {
          return res.json({ success: false, message: '아이디 또는 비밀번호가 잘못되었습니다' });
        }
        if (userInfo.dataValues.role !== isAdmin) {
          return res.json({ success: false, message: '관리자 권한이 없습니다' });
        }
        if (userInfo.dataValues.expiredDatetime) {
          return res.json({ success: false, message: '탈퇴한 회원입니다' });
        }

        delete userInfo.password;
        const accessToken = generateAccessToken(userInfo.dataValues);
        sendAccessToken(res, accessToken);

        return res.status(201).json({ success: true, message: '로그인이 완료되었습니다' });
      } catch (err) {
        console.log(err);
      }
    } else {
      // const verify = await user_verify.findOne({ where: { user_id: userId } });
      // if (verify.dataValues.email_verified) {
      if (!userId) return res.json({ success: false, message: '아이디를 입력해주세요' });
      if (!password) return res.json({ success: false, message: '비밀번호를 입력해주세요' });
      try {
        const userInfo = await user.findOne({ where: { userId } });
        if (!userInfo) {
          return res.json({ success: false, message: '아이디 또는 비밀번호가 잘못되었습니다' });
        }
        const match = await bcrypt.compare(password, userInfo.dataValues.password);
        if (!match) {
          console.log(userInfo.dataValues);
          return res.json({ success: false, message: '아이디 또는 비밀번호가 잘못되었습니다' });
        }
        const verify = await user_verify.findOne({ where: { user_id: userId } });
        if (verify) {
          if (!verify.dataValues.email_verified) {
            return res.json({ success: false, message: '이메일 인증을 완료해주세요' });
          }
        }

        delete userInfo.dataValues.password;
        const accessToken = generateAccessToken(userInfo.dataValues);
        sendAccessToken(res, accessToken);

        return res.status(201).json({ success: true, message: '로그인이 완료되었습니다' });
      } catch (err) {
        console.log(err);
      }
      // } else {
      //   return res.json({ success: false, message: '이메일 인증을 완료해주세요.' });
      // }
    }
  },
  checkToken: (req, res) => {
    const accessToken = isAuthorized(req);
    if (!accessToken)
      return res.json({ success: false, loginId: null, message: '로그아웃 상태입니다' });
    const loginId = accessToken.userId;
    res.json({ success: true, loginId: loginId, message: '로그인 상태입니다' });
  },
};
