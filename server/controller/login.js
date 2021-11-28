require('dotenv').config();
const { user } = require('../models');
const { generateAccessToken, sendAccessToken, isAuthorized } = require('./functions/user');

module.exports = {
  login: (req, res) => {
    const { userId, password } = req.body;
    if (!userId) return res.json({ success: false, message: '아이디를 입력해주세요' });
    if (!password) return res.json({ success: false, message: '비밀번호를 입력해주세요' });

    user
      .findOne({ where: { user_id: userId } })
      .then((data) => {
        if (!data)
          return res.json({ success: false, message: '아이디 또는 비밀번호가 잘못되었습니다' });
        if (data.dataValues.password !== password)
          return res.json({ success: false, message: '아이디 또는 비밀번호가 잘못되었습니다' });

        delete data.dataValues.password;

        const accessToken = generateAccessToken(data.dataValues);
        sendAccessToken(res, accessToken);

        return res.status(201).json({ success: true, message: '로그인이 완료되었습니다' });
      })
      .catch((err) => console.log(err));
  },
};
