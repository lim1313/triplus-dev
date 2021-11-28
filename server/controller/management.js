const {createGuideCard} = require('./functions/guide_card');

module.exports = {
  example: (req, res) => {
    res.status(200).send('this is example for management');
  },
  
  createGuideCard: async (req, res) => {
    const params = req.body;
    const resCode = await createGuideCard(params);

    if(resCode === 200){
      res.status(200).send('가이드 카드를 작성하였습니다.');
    }else{
      res.status(400).send('가이드 카드를 작성하지 못하였습니다.');
    }
  },

  changeStateAppend: (req, res) => {

  },

  changeStateReject: (req, res) => {

  },

  changeStateCompleted: (req, res) => {

  },

  changeStateCancled: (req, res) => {

  },
}