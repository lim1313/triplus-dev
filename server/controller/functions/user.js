require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');
const {user, guide_user_participate, user_verify} = require('./../../models');
const bcrypt = require('bcrypt');
const { hashPassword } = require('./secure');

const authorized = (accessToken) => {
  if (!accessToken) return null;
  try {
    return verify(accessToken, process.env.ACCESS_SECRET);
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '3h' });
  },

  sendAccessToken: (res, accessToken) => {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 48),
    });
  },

  isAuthorized: (req) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) return null;
    try {
      return verify(accessToken, process.env.ACCESS_SECRET);
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  updateUser: async (req) => {
    const resObject = {};
    const accessToken = authorized(req.cookies.accessToken);

    if (!accessToken) {
      resObject['code'] = 401;
      resObject['message'] = '로그인 시간이 만료되었습니다';

      return resObject;
    }

    await user
      .update(req.body, {
        where: { userId: accessToken.userId },
      })
      .then(() => {
        resObject['code'] = 201;
        resObject['message'] = '유저 정보를 수정하였습니다';
      })
      .catch(() => {
        resObject['code'] = 400;
        resObject['message'] = '유저 정보를 수정하지 못하였습니다';
      });

    return resObject;
  },

  expiredUser: async (req) => {
    const resObject = {};
    const accessToken = authorized(req.cookies.accessToken);

    try {
      if (!accessToken) {
        throw '로그인하여 주시기 바랍니다';
      }

      const userData = await user.findOne({ where: { userId: accessToken.userId } });
      const match = await bcrypt.compare(req.body.password, userData.dataValues.password);
      if (!match) {
        throw '비밀번호를 잘못 입력하였습니다';
      }

      await user.update(
        {
          expiredDatetime: new Date()
        }, {
          where: {userId: userData.dataValues.userId}
        }
      ).then(() => {
        resObject['code'] = 200;
        resObject['message'] = '회원탈퇴 되었습니다';
      }).catch((error) => {
        console.log(error);
        resObject['code'] = 500;
        resObject['message'] = '서버에 오류가 발생했습니다';
      });

      await guide_user_participate.update(
        {left: 'left'},
        {where: {userId: userData.dataValues.userId}}
      );
    } catch (error) {
      console.log(error);
      resObject['code'] = 400;
      resObject['message'] = error;
    }
    return resObject;
  },

  changePassword: async (req) => {
    const resObject = {};
    const accessToken = authorized(req.cookies.accessToken);

    try {
      if (!accessToken) {
        throw '로그인하여 주시기 바랍니다';
      }

      const userData = await user.findOne({ where: { userId: accessToken.userId } });
      const match = await bcrypt.compare(req.body.oldPassword, userData.dataValues.password);
      if (!match) {
        throw '비밀번호를 잘못 입력하였습니다';
      }

      const password = await hashPassword(req.body.password);
      await user
        .update(
          {
            password,
          },
          {
            where: { userId: userData.dataValues.userId },
          }
        )
        .then(() => {
          resObject['code'] = 200;
          resObject['message'] = '비밀번호가 변경 되었습니다';
        })
        .catch((error) => {
          console.log(error);
          resObject['code'] = 500;
          resObject['message'] = '서버에 오류가 발생했습니다';
        });
    } catch (error) {
      console.log(error);
      resObject['code'] = 400;
      resObject['message'] = error;
    }
    return resObject;
  },

  selectUser: (userId) => {

    return user.findOne({
      attributes: ['userId', 'email', 'nickName', 'region', 'image'],
      where: {
          userId
      }
    }).then(result => {
      const userInfo = result.dataValues;
      return userInfo;
    });
  },

  updateEmail: async (req) => {
    const resObject = {};
    const accessToken = authorized(req.cookies.accessToken);
    const userVerify = await user_verify.findOne({
      where: {user_id: accessToken.userId, email: req.body.email, verify_key: req.body.verifyKey}
    });
    
    try {
      if(!userVerify.user_id){
        throw '인증번호가 일치하지 않습니다'
      }

      user.update({email: req.body.email}, {where: {userId: accessToken.userId}});
      
      resObject['code'] = 200;
      resObject['message'] = '이메일이 변경되었습니다';
    } catch (error) {
      resObject['code'] = 400;
      resObject['message'] = '이메일을 변경하지 못하였습니다';
    }

    return resObject;
  },
};
