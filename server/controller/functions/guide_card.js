const {guide_card} = require('./../../models');

module.exports = {
  createGuideCard: async (params) => {
    let returnCode;
    const insertValue = {
      state: 'REQUEST'
    };

    try {
      for(let param in params){
        if(params[param]){
          if(param === 'title'){
            insertValue[`title`] = params[param];
          }else if(param === 'content'){
            insertValue[`content`] = params[param];
          }else if(param === 'guideDate'){
            const guideDate = new Date(params[param]);
            insertValue[`guide_date`] = guideDate;
          }else if(param === 'startTime'){
            insertValue[`start_time`] = params[param];
          }else if(param === 'endTime'){
            insertValue[`end_time`] = params[param];
          }else if(param === 'numPeople'){
            insertValue[`num_people`] = params[param];
          }else if(param === 'address'){
            insertValue[`address`] = params[param];
          }else if(param === 'latitude'){
            insertValue[`latitude`] = params[param];
          }else if(param === 'longitude'){
            insertValue[`longitude`] = params[param];
          }else if(param === 'openDate'){
            insertValue[`open_date`] = params[param];
          }
        }
      }

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

  },
}