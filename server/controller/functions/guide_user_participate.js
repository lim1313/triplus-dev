const {isAuthorized} = require('./user');

module.exports = {
  createGuideUserParticipate: (req) => {
    const resObject = {};
    const accessToken = isAuthorized(req);
    console.log(req.cookies.accessToken);
    console.log(accessToken);

    // 토큰이 없었을 때
    try {
      if(!accessToken){
        throw 'accessToken이 없습니다';
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
      resObject['code'] = 401;
      resObject['message'] = error;
    }

    // 참가인원이 다 찼을 때

    // 토큰이 있을 때
    resObject['code'] = 201;
    resObject['message'] = '참가신청이 되었습니다'

    return resObject;
  }
}