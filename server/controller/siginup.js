require('dotenv').config();
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
};
