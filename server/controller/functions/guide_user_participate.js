const {isAuthorized} = require('./user');
const {guide_user_participate} = require('./../../models');
const {selectGuideCardById} = require('./../functions/guide_card');
const GLOBAL_VARIABLE = require('./global_variable');

module.exports = {
  createGuideUserParticipate: async (req) => {
    const resObject = {};
    const accessToken = isAuthorized(req);
    const {guideCard} = await selectGuideCardById(req.body.guideId);

    // 토큰이 없었을 때
    try {
      if(!accessToken){
        throw 'accessToken이 없습니다';
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
      resObject['code'] = 401;
      resObject['message'] = error;
      return resObject;
    }

    // 참가인원이 다 찼을 때
    if(guideCard.state === GLOBAL_VARIABLE.COMPLETED){
      resObject['code'] = 201;
      resObject['message'] = '이미 마감된 가이드입니다';

      return resObject;
    }

    // 중복 참가신청 됐을 때
    try {
      const guideUserParticipate = await guide_user_participate.findOne({
        where: {
          guideId: guideCard.guideId,
          userId: accessToken.userId
        }
      });

      if(guideUserParticipate){
        throw '이미 참가신청 된 가이드입니다'
      }
    } catch (error) {
      console.log(error);
      resObject['code'] = 204;
      resObject['message'] = error;
      
      return resObject;
    }
    
    // 참가신청이 됐을 때
    try {
      const guideUserParticipate = await guide_user_participate.create({
        guideId: guideCard.guideId,
        userId: accessToken.userId
      });
      resObject['code'] = 204;
      resObject['message'] = '참가신청이 되었습니다';
      
      return resObject;
    } catch (error) {
      console.log(error);
      resObject['code'] = 401;
      resObject['message'] = '참가신청이 되지않았습니다';

      return resObject;
    }
  }
}