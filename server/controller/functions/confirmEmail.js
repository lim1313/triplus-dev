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
};
