const { isAuthorized } = require('./functions/user');

module.exports = {
  isLogin: (req, res) => {
    const userInfo = isAuthorized(req);
    if (!userInfo || userInfo.role === 'admin') {
      return res
        .clearCookie('accessToken', {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
        })
        .json({ isLogin: false });
    } else if (userInfo) {
      return res.json({ isLogin: true });
    } else {
    }
  },
};
