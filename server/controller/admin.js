const { updateGuideCard } = require('./functions/guide_card');
const GLOBAL_VARIABLE = require('./functions/global_variable');
const { guide_card, guide_image } = require('../models');
const { isAuthorized } = require('./functions/user');
const { consumers } = require('nodemailer/lib/xoauth2');

module.exports = {
  guideCardList: async (req, res) => {
    const verified = isAuthorized(req);
    if (!verified) return res.status(200).send('다시 로그인해주세요');
    else if (verified.role === 'general')
      return res.status(200).send('관리자 권한이 없습니다. 다시 로그인 해주세요');

    try {
      const { page, size } = req.query;
      const numberPage = Number(page);
      const numberSize = Number(size);
      // raw:true 를 하면 안 된다. include 를 할 때 같은 가이드 카드가 여러개 나온다
      const guideCardList = await guide_card.findAll({
        where: { state: 'APPROVED' },
        include: [
          {
            model: guide_image,
          },
        ],
      });
      const guideListCount = guideCardList.length;
      const startIdx = numberPage * numberSize;
      const endIdx =
        (numberPage + 1) * numberSize > guideListCount
          ? guideListCount
          : (numberPage + 1) * numberSize;
      const filteredList = guideCardList.slice(startIdx, endIdx);
      res.status(200).json({ data: filteredList, count: guideListCount });
    } catch (err) {
      console.log(err);
      res.status(500).send('잠시 후에 다시 시도해주세요');
    }
  },

  // > 진행중인 것: APPROVED

  changeStateCanceled: async (req, res) => {
    const verified = isAuthorized(req);
    console.log(verified);
    if (!verified) return res.status(400).send('다시 로그인해주세요');
    else if (verified.role === 'general')
      return res.status(400).send('관리자 권한이 없습니다. 다시 로그인 해주세요');

    try {
      const params = req.body;
      // > req.body : {guideId: guideId}
      params.state = GLOBAL_VARIABLE.CANCELED;
      const resObject = await updateGuideCard(params);
      res.status(resObject.code).send(resObject.message);
    } catch (err) {
      console.log(err);
      res.status(500).send('잠시 후에 다시 시도해주세요');
    }
  },
};
