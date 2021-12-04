const {guide_card, user} = require('./../../models');
const {Op} = require('sequelize');
const GLOBAL_VARIABLE = require('./global_variable');
const date_fns = require('date-fns');

const checkParams = (params) => {
  const setParams = {};

  try {
    for(let param in params){
      if(params[param]){
        if(param === 'title'){
          setParams[`title`] = params[param];
        }else if(param === 'content'){
          setParams[`content`] = params[param];
        }else if(param === 'guideDate'){
          const guideDate = new Date(params[param]);
          setParams[`guide_date`] = guideDate;
        }else if(param === 'startTime'){
          setParams[`start_time`] = params[param];
        }else if(param === 'endTime'){
          setParams[`end_time`] = params[param];
        }else if(param === 'numPeople'){
          setParams[`num_people`] = params[param];
        }else if(param === 'address'){
          setParams[`address`] = params[param];
        }else if(param === 'latitude'){
          setParams[`latitude`] = params[param];
        }else if(param === 'longitude'){
          setParams[`longitude`] = params[param];
        }else if(param === 'openDate'){
          setParams[`open_date`] = params[param];
        }else if(param === 'state'){
          setParams[`state`] = params[param];
        }
      }
    }

    return setParams;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createGuideCard: (params) => {
    let resObject = {};
    const insertValue = checkParams(params);

    try {
      guide_card.create(insertValue).then((result) => {
        resObject['code'] = 200;
        resObject['message'] = '가이드 카드를 작성하였습니다';
      });
    } catch (error) {
      console.log(error);
      resObject['code'] = 400;
      resObject['message'] = '가이드 카드를 작성하지 못하였습니다';
    } finally {
      return resObject;
    }
    
  },

  updateGuideCard: (params) => {
    const resObject = {};
    const updateValue = checkParams(params);

    try {
      guide_card.update(updateValue, {
        where: {guide_id: params.guideId}
      }).then(() => {
        resObject['code'] = 200;
        resObject['message'] = '가이드 카드를 수정 했습니다';
      }).catch(error => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
      resObject['code'] = 400;
      resObject['message'] = '가이드 카드를 수정하지 못했습니다';
    } finally {
      return resObject;
    }
  },

  selectGuideCard: async (params) => {
    const resObject = {};
    const whereGuideCard = {[Op.and]: []};
    const whereUser = {};

    try {
      if(params['swLat']){
        whereGuideCard[Op.and].push({latitude: {[Op.gte]: params['swLat']}});
      }
      if(params['neLat']){
        whereGuideCard[Op.and].push({latitude: {[Op.lte]: params['neLat']}});
      }
      if(params['swLng']){
        whereGuideCard[Op.and].push({longitude: {[Op.gte]: params['swLng']}});
      }
      if(params['neLng']){
        whereGuideCard[Op.and].push({longitude: {[Op.lte]: params['neLng']}});
      }
      if(params['startDate']){
        whereGuideCard[Op.and].push({guide_date: {[Op.gte]: new Date(params['startDate'])}});
      }
      if(params['endDate']){
        whereGuideCard[Op.and].push({guide_date: {[Op.lte]: new Date(params['endDate'])}});
      }
      if(params['gender'] === '0'){
        whereUser['gender'] = false;
      }else if(params['gender'] === '1'){
        whereUser['gender'] = true;
      }
    } catch (error) {
      console.log(error);
      resObject['code'] = 401;
      resObject['message'] = '가이드 카드 검색 조건을 잘못 입력하였습니다';
      resObject['guideCardList'] = [];

      return resObject;
    }

    await guide_card.findAll({
      raw: true,
      include: [
        {
          model: user,
          attributes: ['nickName', 'gender'],
          where: whereUser,
        }
      ],
      where: whereGuideCard
    }).then(result => {
      for(let item of result){
        item['guideDate'] = date_fns.format(item['guideDate'], 'yyyy.MM.dd');
        item['createdAt'] = date_fns.format(item['createdAt'], 'yyyy.MM.dd');
        item['updatedAt'] = date_fns.format(item['updatedAt'], 'yyyy.MM.dd');
        item['tourImage'] = '/asset/main/trip5.png';

        item['nickName'] = item['user.nickName'];
        delete item['user.nickName'];

        item['gender'] = item['user.gender'];
        delete item['user.gender'];
      }

      resObject['code'] = 200;
      resObject['message'] = '가이드 카드를 조회했습니다'
      resObject['guideCardList'] = result;
    }).catch(error => {
      console.log(error);
      resObject['code'] = 400;
      resObject['message'] = '가이드 카드를 조회하지 못하였습니다'
      resObject['guideCardList'] = [];
    });

    return resObject;
  },

  selectGuideCardById: async (guideId) => {
    const resObject = {};
    
    await guide_card.findOne({
      raw: true,
      include: [
        {
          model: user,
          attributes: ['nickName', 'gender'],
        }
      ],
      where: {guideId}
    }).then(result => {
      result['guideDate'] = date_fns.format(result['guideDate'], 'yyyy.MM.dd');
      result['createdAt'] = date_fns.format(result['createdAt'], 'yyyy.MM.dd');
      result['updatedAt'] = date_fns.format(result['updatedAt'], 'yyyy.MM.dd');

      result['nickName'] = result['user.nickName'];
      delete result['user.nickName'];

      result['gender'] = result['user.gender'];
      delete result['user.gender'];

      resObject['code'] = 200;
      resObject['message'] = '가이드 카드를 조회했습니다';
      resObject['guideCard'] = result;
    }).catch(error => {
      console.log(error);
      resObject['code'] = 400;
      resObject['message'] = '가이드 카드를 조회하지 못하였습니다';
      resObject['guideCard'] = {};
    });

    return resObject;
  }
}