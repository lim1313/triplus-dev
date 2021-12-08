require('dotenv').config();
const { user, user_verify } = require('../../models');

module.exports = {
  confirmEmail: async (req, res) => {
    const user = await user_verify.findOne({ where: { verify_key: req.query.key } });
    if (user) {
      user_verify.update({ email_verified: 1 }, { where: { user_id: user.dataValues.user_id } });
      console.log(user);
      return res.send('<script type="text/javascript">alert("인증이 완료되었습니다."); </script>');
    } else {
      res.send('<script type="text/javascript">alert("인증에 실패했습니다."); </script>');
    }
  },
  changeEmail: async (req, res) => {
    const userEmail = await user_verify.findOne({ where: { verify_key: req.query.key } });
    if (userEmail) {
      console.log('이메일 인증 ');
      user_verify.update({ email_verified: 2 }, { where: { verify_key: req.query.key } });
      return res.send('<script type="text/javascript">alert("인증이 완료되었습니다.");</script>');
    } else {
      console.log('이메일 인증 실패');
      return res.send(
        '<script type="text/javascript">alert("인증에 실패했습니다."); window.location="http://localhost:3000/mypage";</script>'
      );
    }
  },
};
