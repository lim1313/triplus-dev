const GLOBAL_VARIABLE = require('./functions/global_variable');
const {selectGuideCard} = require('./functions/guide_card');

module.exports = {
  example: (req, res) => {
    res.status(200).send('this is example for map');
  },

  selectGuideCard: async (req, res) => {
    const params = req.query;
    const guideCardList = await selectGuideCard(params);
    console.log(guideCardList);

    res.status(200).json({
      code: 200,
    });
  }
}