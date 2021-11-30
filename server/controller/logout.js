require('dotenv').config();

module.exports = {
  logout: (req, res) => {
    res
      .clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      })
      .json({ success: true });
  },
};
