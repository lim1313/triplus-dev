const { guide_card, user, guide_user_participate, guide_image } = require('./../../models');
const { Op } = require('sequelize');
const GLOBAL_VARIABLE = require('./global_variable');
const date_fns = require('date-fns');
const { isAuthorized } = require('./user');

const checkParams = (params) => {
  const setParams = {};

  try {
    for (let param in params) {
      if (params[param]) {
        if (param === 'title') {
          setParams[`title`] = params[param];
        } else if (param === 'content') {
          setParams[`content`] = params[param];
        } else if (param === 'guideDate') {
          const guideDate = new Date(params[param]);
          setParams[`guideDate`] = guideDate;
        } else if (param === 'startTime') {
          setParams[`startTime`] = params[param];
        } else if (param === 'endTime') {
          setParams[`endTime`] = params[param];
        } else if (param === 'numPeople') {
          setParams[`numPeople`] = params[param];
        } else if (param === 'address') {
          setParams[`address`] = params[param];
        } else if (param === 'latitude') {
          setParams[`latitude`] = params[param];
        } else if (param === 'longitude') {
          setParams[`longitude`] = params[param];
        } else if (param === 'openDate') {
          setParams[`openDate`] = params[param];
        } else if (param === 'state') {
          setParams[`state`] = params[param];
        }
      }
    }

    return setParams;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createGuideCard: async (req) => {
    let resObject = {};
    const insertValue = checkParams(req.body);
    const accessToken = isAuthorized(req);

    // 토큰이 없었을 때
    try {
      if (!accessToken) {
        throw 'accessToken이 없습니다';
      }
      insertValue['userId'] = accessToken.userId;
      insertValue['state'] = GLOBAL_VARIABLE.REQUESTED;
    } catch (error) {
      console.log(`ERROR: ${error}`);
      resObject['code'] = 400;
      resObject['message'] = error;
      return resObject;
    }

    try {
      const guideCard = await guide_card.create(insertValue);

      if (req.files.length > 0) {
        const guideImages = [];
        for (let guideImage of req.files) {
          guideImages.push({ guideId: guideCard.dataValues.guideId, image: guideImage.location });
        }

        guide_image.bulkCreate(guideImages);
      }

      resObject['code'] = 200;
      resObject['message'] = '가이드 카드를 작성하였습니다';
    } catch (error) {
      console.log(error);
      resObject['code'] = 400;
      resObject['message'] = '가이드 카드를 작성하지 못하였습니다';
    } finally {
      return resObject;
    }
  },

  updateGuideCard: async (params) => {
    const resObject = {};
    const updateValue = checkParams(params);

    try {
      await guide_card
        .update(updateValue, {
          where: { guide_id: params.guideId },
        })
        .then(() => {
          resObject['code'] = 200;
          resObject['message'] = '가이드 카드를 수정 했습니다';
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      resObject['code'] = 400;
      resObject['message'] = '가이드 카드를 수정하지 못했습니다';
    } finally {
      return resObject;
    }
  },

  selectGuideCard: async (params) => {
    const resObject = {};
    const whereGuideCard = { [Op.and]: [] };
    const whereUser = {};

    try {
      if (params['swLat']) {
        whereGuideCard[Op.and].push({ latitude: { [Op.gte]: params['swLat'] } });
      }
      if (params['neLat']) {
        whereGuideCard[Op.and].push({ latitude: { [Op.lte]: params['neLat'] } });
      }
      if (params['swLng']) {
        whereGuideCard[Op.and].push({ longitude: { [Op.gte]: params['swLng'] } });
      }
      if (params['neLng']) {
        whereGuideCard[Op.and].push({ longitude: { [Op.lte]: params['neLng'] } });
      }
      if (params['startDate']) {
        whereGuideCard[Op.and].push({ guide_date: { [Op.gte]: new Date(params['startDate']) } });
      }
      if (params['endDate']) {
        whereGuideCard[Op.and].push({ guide_date: { [Op.lte]: new Date(params['endDate']) } });
      }
      if (params['gender'] === '0') {
        whereUser['gender'] = false;
      } else if (params['gender'] === '1') {
        whereUser['gender'] = true;
      }
    } catch (error) {
      console.log(error);
      resObject['code'] = 401;
      resObject['message'] = '가이드 카드 검색 조건을 잘못 입력하였습니다';
      resObject['guideCardList'] = [];

      return resObject;
    }

    try {
      const guideCards = await guide_card.findAll({
        include: [
          {
            model: user,
            attributes: ['nickName', 'gender'],
            where: whereUser,
          },
          {
            model: guide_image,
          },
        ],
        where: whereGuideCard,
      });

      if (guideCards.length <= 0) {
        throw '현재 지역의 가이드 카드가 없습니다';
      }

      for (let guideCard of guideCards) {
        console.log(guideCard.dataValues);
      }
    } catch (error) {
      console.log(error);
      resObject['code'] = 200;
      resObject['message'] = error;
      resObject['guideCardList'] = [];
    }

    const guideCards = await guide_card
      .findAll({
        raw: true,
        include: [
          {
            model: user,
            attributes: ['nickName', 'gender'],
            where: whereUser,
          },
        ],
        where: whereGuideCard,
      })
      .then((result) => {
        for (let item of result) {
          item['guideDate'] = date_fns.format(item['guideDate'], 'yyyy.MM.dd');
          item['createdAt'] = date_fns.format(item['createdAt'], 'yyyy.MM.dd');
          item['updatedAt'] = date_fns.format(item['updatedAt'], 'yyyy.MM.dd');
          item['tourImage'] = '/asset/main/trip5.png';

          item['nickName'] = item['user.nickName'];
          delete item['user.nickName'];

          item['gender'] = item['user.gender'];
          delete item['user.gender'];
        }

        resObject['code'] = 200;
        resObject['message'] = '가이드 카드를 조회했습니다';
        resObject['guideCardList'] = result;
      })
      .catch((error) => {
        console.log(error);
        resObject['code'] = 400;
        resObject['message'] = '가이드 카드를 조회하지 못하였습니다';
        resObject['guideCardList'] = [];
      });

    return resObject;
  },

  selectGuideCardById: async (guideId) => {
    const resObject = {};

    await guide_card
      .findOne({
        raw: true,
        include: [
          {
            model: user,
            attributes: ['nickName', 'gender'],
          },
        ],
        where: { guideId },
      })
      .then((result) => {
        result['guideDate'] = date_fns.format(result['guideDate'], 'yyyy.MM.dd');
        result['createdAt'] = date_fns.format(result['createdAt'], 'yyyy.MM.dd');
        result['updatedAt'] = date_fns.format(result['updatedAt'], 'yyyy.MM.dd');

        result['nickName'] = result['user.nickName'];
        delete result['user.nickName'];

        result['gender'] = result['user.gender'];
        delete result['user.gender'];

        resObject['code'] = 200;
        resObject['message'] = '가이드 카드를 조회했습니다';
        resObject['guideCard'] = result;
      })
      .catch((error) => {
        console.log(error);
        resObject['code'] = 400;
        resObject['message'] = '가이드 카드를 조회하지 못하였습니다';
        resObject['guideCard'] = {};
      });

    return resObject;
  },

  selectGuideCardByUserId: async (req) => {
    const resObject = {};
    const accessToken = isAuthorized(req);

    // 토큰이 없었을 때
    try {
      if (!accessToken) {
        throw 'accessToken이 없습니다';
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
      resObject['code'] = 400;
      resObject['message'] = error;
      return resObject;
    }

    try {
      const guideCard = await guide_card.findOne({
        raw: true,
        where: {
          userId: accessToken.userId,
          state: GLOBAL_VARIABLE.APPROVED,
        },
        order: [['createdAt', 'DESC']],
      });

      if (!guideCard) {
        throw '진행 중인 가이드가 없습니다';
      }

      const guideData = {
        guideId: guideCard.guideId,
        title: guideCard.title,
        guideDate: date_fns.format(guideCard['guideDate'], 'yyyy.MM.dd'),
      };

      resObject['guideData'] = guideData;

      const guideUserParticipate = await guide_user_participate.findAll({
        raw: true,
        where: { guideId: guideCard.guideId },
        include: [
          {
            model: user,
            attributes: ['nickName', 'region'],
          },
        ],
        order: [['createdAt', 'ASC']],
      });

      const applicant = [];
      if (guideUserParticipate.length > 0) {
        for (let userInfo of guideUserParticipate) {
          const userInfoItem = {};
          userInfoItem['userId'] = userInfo.userId;
          userInfoItem['nickname'] = userInfo['user.nickName'];
          userInfoItem['region'] = userInfo['user.region'];
          userInfoItem['createAt'] = date_fns.format(userInfo['createdAt'], 'yyyy.MM.dd');

          applicant.push(userInfoItem);
        }
      }

      resObject['applicant'] = applicant;
      resObject['code'] = 200;

      return resObject;
    } catch (error) {
      resObject['code'] = 200;
      resObject['message'] = error;
      resObject['guideData'] = {};
      resObject['applicant'] = [];

      return resObject;
    }
  },
};
