const GLOBAL_VARIABLE = require('./functions/global_variable');
const { selectGuideCard, selectGuideCardById } = require('./functions/guide_card');
const { createGuideUserParticipate } = require('./functions/guide_user_participate');

module.exports = {
  example: (req, res) => {
    res.status(200).send('this is example for map');
  },

  selectGuideCard: async (req, res) => {
    const params = req.query;
    const resObject = await selectGuideCard(params, req);

    res.status(resObject.code).json({
      message: resObject.message,
      guideCardList: resObject.guideCardList,
    });
  },

  selectGuideCardById: async (req, res) => {
    const resObject = await selectGuideCardById(req);

    res.status(resObject.code).json({
      message: resObject.message,
      guideCard: resObject.guideCard,
      userId: resObject.userId,
    });
  },

  createGuideUserParticipate: async (req, res) => {
    const resObject = await createGuideUserParticipate(req);

    res.status(resObject.code).json({
      message: resObject.message,
    });
  },
};
