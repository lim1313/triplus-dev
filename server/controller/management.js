const {
  createGuideCard,
  updateGuideCard,
  selectGuideCardByUserId,
  selectGuideCardForTour,
} = require('./functions/guide_card');
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

  selectGuideCardForTour: (req, res) => {
    const resObject = selectGuideCardForTour(req);
    res.status(resObject.code).send(resObject.message);
  }
};
