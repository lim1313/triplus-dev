require('dotenv').config();
const bcrypt = require('bcrypt');
const { user } = require('../models');

module.exports = {
  idcheck: (req, res) => {
    const { userId } = req.query;
    user
      .findOne({ where: { user_id: userId } })
      .then((data) => {
        if (data) {
          return res.json({ message: '사용이 불가능한 아이디입니다' });
        } else {
          return res.json({ message: '사용이 가능한 아이디입니다.' });
        }
      })
      .catch((err) => console.log(err));
  },
  signup: (req, res) => {
    const { userId, password, email } = req.body;
    const saltRounds = 12;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        user
          .findOrCreate({
            where: { user_id: userId },
            defaults: { user_id: userId, password: hash, email, role: 'general' },
          })
          .then(([data, created]) => {
            if (created) {
              res.status(201).json({ success: true, message: '회원가입이 완료되었습니다' });
            }
          })
          .catch((err) => console.log(err));
      });
    });
  },
};
