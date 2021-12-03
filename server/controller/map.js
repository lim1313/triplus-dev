const GLOBAL_VARIABLE = require('./functions/global_variable');
const {selectGuideCard, selectGuideCardById} = require('./functions/guide_card');

module.exports = {
  example: (req, res) => {
    res.status(200).send('this is example for map');
  },

  selectGuideCard: async (req, res) => {
    const params = req.query;
    const resObject = await selectGuideCard(params);

    res.status(resObject.code).json({
      message: resObject.message,
      guideCardList: resObject.guideCardList,
    });
  },

  selectGuideCardById: async (req, res) => {
    const resObject = await selectGuideCardById(req.query.guideId);

    res.status(resObject.code).json({
      message: resObject.message,
      guideCard: resObject.guideCard,
    });
  }
}