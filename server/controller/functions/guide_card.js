const {guide_card} = require('./../../models');
const {Op} = require('sequelize');
const GLOBAL_VARIABLE = require('./global_variable');

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
  createGuideCard: async (params) => {
    let returnCode;
    const insertValue = checkParams(params);

    try {
      await guide_card.create(insertValue).then((result) => {
        returnCode = 200;
      }).catch(error => {
        console.log(error);
        returnCode = 400;
      });
    } catch (error) {
      console.log(error);
      returnCode = 400;
    }finally{
      return returnCode;
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
        resObject['message'] = '가이드 카드를 수정 했습니다'
      }).catch(error => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
      resObject['code'] = 400;
      resObject['message'] = '가이드 카드를 수정하지 못했습니다'
    } finally {
      return resObject;
    }
  },

  selectGuideCard: (params) => {
    const resObject = {};
    const whereObj = {[Op.and]: []};

    try {
      console.log(params);
      
      if(params['swLat']){
        whereObj[Op.and].push({latitude: {[Op.gte]: params['swLat']}});
      }
      if(params['neLat']){
        whereObj[Op.and].push({latitude: {[Op.lte]: params['neLat']}});
      }
      if(params['swLng']){
        whereObj[Op.and].push({longitude: {[Op.gte]: params['swLng']}});
      }
      if(params['neLng']){
        whereObj[Op.and].push({longitude: {[Op.lte]: params['neLng']}});
      }
      if(params['startDate']){
        whereObj[Op.and].push({guide_date: {[Op.gte]: new Date(params['startDate'])}});
      }
      if(params['endDate']){
        whereObj[Op.and].push({guide_date: {[Op.lte]: new Date(params['endDate'])}});
      }
      
      guide_card.findAll({
        raw: true,
        where: whereObj
      }).then(result => {
        resObject['guideCardList'] = result;
      });
    } catch (error) {
      
    } finally {
      return resObject;
    }
  },
}