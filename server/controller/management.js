const {createGuideCard, updateGuideCard} = require('./functions/guide_card');
const GLOBAL_VARIABLE = require('./functions/global_variable');

module.exports = {
  example: (req, res) => {
    res.status(200).send('this is example for management');
  },
  
  createGuideCard: async (req, res) => {
    const params = req.body;
    params.state = GLOBAL_VARIABLE.REQUESTED;
    const resObject = await createGuideCard(params);

    res.status(resObject.code).send(resObject.message);
  },

  updateGuideCard: async (req, res) => {
    const params = req.body;
    const resObject = await updateGuideCard(params);
    res.status(resObject.code).send(resObject.message);
  },

  changeStateApproved: (req, res) => {
    const params = req.body;
    params.state = GLOBAL_VARIABLE.APPROVED;
    const resObject = updateGuideCard(params);
    res.status(resObject.code).send(resObject.message);
  },

  changeStateRejected: (req, res) => {
    const params = req.body;
    params.state = GLOBAL_VARIABLE.REJECTED;
    const resObject = updateGuideCard(params);
    res.status(resObject.code).send(resObject.message);
  },

  changeStateCompleted: (req, res) => {
    const params = req.body;
    params.state = GLOBAL_VARIABLE.COMPLETED;
    const resObject = updateGuideCard(params);
    res.status(resObject.code).send(resObject.message);
  },

  changeStateCanceled: (req, res) => {
    const params = req.body;
    params.state = GLOBAL_VARIABLE.CANCELED;
    const resObject = updateGuideCard(params);
    res.status(resObject.code).send(resObject.message);
  },
}