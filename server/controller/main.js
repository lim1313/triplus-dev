const { isAuthorized } = require('./functions/user');

module.exports = {
  isLogin: (req, res) => {
    const userInfo = isAuthorized(req);

    if (userInfo) {
      return res.json({ isLogin: true });
    } else {
      return res
        .clearCookie('accessToken', {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
        })
        .json({ isLogin: false });
    }
  },
};
