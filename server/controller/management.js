const {
  createGuideCard,
  updateGuideCard,
  selectGuideCardByUserId,
} = require('./functions/guide_card');
const {findGuideUserApproved, findGuideUserCompleted} = require('./functions/guide_user_participate');
const GLOBAL_VARIABLE = require('./functions/global_variable');

module.exports = {
  example: (req, res) => {
    res.status(200).send('this is example for management');
  },

  createGuideCard: async (req, res) => {
    const resObject = await createGuideCard(req);
    console.log(resObject);
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

  changeStateCanceled: async (req, res) => {
    const params = req.body;
    params.state = GLOBAL_VARIABLE.CANCELED;
    const resObject = await updateGuideCard(params);
    res.status(resObject.code).send(resObject.message);
  },

  selectGuideCardByUserId: async (req, res) => {
    const resObject = await selectGuideCardByUserId(req);
    res.status(resObject.code).json({
      guideData: resObject.guideData,
      applicant: resObject.applicant,
      message: resObject.message,
    });
  },

  findGuideUserApproved: async (req, res) => {
    const resObject = await findGuideUserApproved(req);
    res.status(resObject.code).json({
      guideList: resObject.guideList,
      message: resObject.message
    });
  },

  findGuideUserCompleted: async (req, res) => {
    const resObject = await findGuideUserCompleted(req);
    res.status(resObject.code).json({
      guideList: resObject.guideList,
      message: resObject.message
    });
  },

  participateCanceled: async (req, res) => {
    const resObject = await findGuideUserCompleted(req);
    res.status(resObject.code).send(resObject.message);
  }
};
