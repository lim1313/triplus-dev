const {createGuideCard, updateGuideCard} = require('./functions/guide_card');
const REQUESTED = 'REQUESTED';
const APPROVED = 'APPROVED';
const REJECTED = 'REJECTED';
const COMPLETED = 'COMPLETED';
const CANCELED = 'CANCELED';

module.exports = {
  example: (req, res) => {
    res.status(200).send('this is example for management');
  },
  
  createGuideCard: async (req, res) => {
    const params = req.body;
    params.state = REQUESTED;
    const resCode = await createGuideCard(params);

    if(resCode === 200){
      res.status(200).send('가이드 카드를 작성하였습니다');
    }else{
      res.status(400).send('가이드 카드를 작성하지 못하였습니다');
    }
  },

  updateGuideCard: async (req, res) => {
    const params = req.body;
    const resObject = await updateGuideCard(params);
    res.status(resObject.code).send(resObject.message);
  },

  changeStateApproved: (req, res) => {
    const params = req.body;
    params.state = APPROVED;
    const resObject = updateGuideCard(params);
    res.status(resObject.code).send(resObject.message);
  },

  changeStateRejected: (req, res) => {
    const params = req.body;
    params.state = REJECTED;
    const resObject = updateGuideCard(params);
    res.status(resObject.code).send(resObject.message);
  },

  changeStateCompleted: (req, res) => {
    const params = req.body;
    params.state = COMPLETED;
    const resObject = updateGuideCard(params);
    res.status(resObject.code).send(resObject.message);
  },

  changeStateCanceled: (req, res) => {
    const params = req.body;
    params.state = CANCELED;
    const resObject = updateGuideCard(params);
    res.status(resObject.code).send(resObject.message);
  },
}