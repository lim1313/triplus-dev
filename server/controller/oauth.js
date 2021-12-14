require('dotenv').config();
const axios = require('axios');
const { google } = require('googleapis');
const { user } = require('../models');
const { generateAccessToken, sendAccessToken, isAuthorized } = require('./functions/user');

module.exports = {
  google: async (req, res) => {
    const accessCode = req.body.authorizationCode;
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.REDIRECT_URL
    );
    const { tokens } = await oauth2Client.getToken(accessCode);
    oauth2Client.setCredentials(tokens);
    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`
    );
    const { sub, email, picture } = userInfo.data;
    user
      .findOrCreate({
        where: { userId: sub, email: email },
        defaults: { userId: sub, email: email, image: picture },
      })
      .then(([data, created]) => {
        const accessToken = generateAccessToken(data.dataValues);
        sendAccessToken(res, accessToken);
        return res.status(201).json({ success: true, message: '로그인이 완료되었습니다' });
      })
      .catch((err) => console.log(err));
  },

  naver: async (req, res) => {
    return res.redirect(
      `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT}&state=STATE_STRING&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}/navercallback`
    );
  },

  navercallback: async (req, res) => {
    const authorizationCode = req.body.authorizationCode;
    const state = req.body.state;
    try {
      const result = await axios.get(
        `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_NAVER_CLIENT}&client_secret=${process.env.REACT_APP_NAVERPW}&code=${authorizationCode}&state=${state}`
      );

      console.log(result);

      const userInfo = await axios.get('https://openapi.naver.com/v1/nid/me', {
        headers: {
          Authorization: `Bearer ${result.data.access_token}`,
        },
        withCredentials: true,
      });

      console.log(userInfo);

      //       data: {
      //   resultcode: '00',
      //   message: 'success',
      //   response: {
      //     id: 'OmHiyO12ExD_LimJlBK7AV1EMsR404RuCDKC7ay56ek',
      //     nickname: 'jk****',
      //     profile_image: 'https://ssl.pstatic.net/static/pwe/address/img_profile.png',
      //     gender: 'M',
      //     email: 'jkyyc3@hanmail.net',
      //     name: '박예찬'
      //   }
      // }
      const { email, nickname, profile_image } = userInfo.data.response;

      const userInstance = await user.findOrCreate({
        where: {
          userId: nickname,
          social: 'naver',
          email: email,
        },
        defaults: {
          password: '',
          role: 'general',
          image: profile_image,
        },
      });

      const instance = userInstance[0];

      const accessToken = generateAccessToken(instance.dataValues);
      sendAccessToken(res, accessToken);
      return res.status(201).json({ success: true, message: '로그인이 완료되었습니다' });
    } catch (error) {
      console.error(error);
      res.status(500).send('잠시 후 다시 시도해주세요');
    }
  },
};
