const { guide_card, user, guide_user_participate, guide_image } = require('./../../models');
const { Op } = require('sequelize');
const GLOBAL_VARIABLE = require('./global_variable');
const date_fns = require('date-fns');
const { isAuthorized } = require('./user');

const checkParams = (params) => {
  const setParams = {};

  try {
    for (let param in params) {
      if (param === 'title') {
        setParams[`title`] = params[param];
      } else if (param === 'content') {
        setParams[`content`] = params[param];
      } else if (param === 'date') {
        let guideDate;
        if (!params[param]) {
          guideDate = new Date();
        } else {
          guideDate = new Date(params[param]);
        }
        setParams[`guideDate`] = guideDate;
      } else if (param === 'startTime') {
        setParams[`startTime`] = params[param];
      } else if (param === 'endTime') {
        setParams[`endTime`] = params[param];
      } else if (param === 'count') {
        setParams[`numPeople`] = params[param];
      } else if (param === 'address') {
        setParams[`address`] = params[param];
      } else if (param === 'latitude') {
        if (params[param]) {
          setParams[`latitude`] = params[param];
        }
      } else if (param === 'longitude') {
        if (params[param]) {
          setParams[`longitude`] = params[param];
        }
      } else if (param === 'openDate') {
        setParams[`openDate`] = params[param];
      } else if (param === 'state') {
        setParams[`state`] = params[param];
      }
    }
    console.log(setParams);
    return setParams;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createGuideCard: async (req) => {
    let resObject = {};
    console.log(req.body);
    const insertValue = checkParams(req.body);
    const accessToken = isAuthorized(req);

    // 토큰이 없었을 때
    try {
      if (!accessToken) {
        throw 'accessToken이 없습니다';
      }
      insertValue['userId'] = accessToken.userId;
      insertValue['state'] = GLOBAL_VARIABLE.APPROVED;
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
    console.log('params', params);

    try {
      await guide_card
        .update(updateValue, {
          where: { guideId: params.guideId },
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
      whereGuideCard[Op.and].push({ state: { [Op.eq]: GLOBAL_VARIABLE.APPROVED } });
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
            attributes: ['nickName', 'gender', 'image'],
            where: whereUser,
          },
          {
            model: guide_image,
            order: ['id', 'ASC'],
          },
        ],
        where: whereGuideCard,
      });

      const guideCardList = [];
      for (let guideCard of guideCards) {
        const guideCardData = guideCard.dataValues;
        const userData = guideCardData.user.dataValues;
        const guideImageData = guideCardData.guide_images;
        const guideCardItem = {};
        guideCardItem['guideId'] = guideCardData['guideId'];
        guideCardItem['title'] = guideCardData['title'];
        guideCardItem['content'] = guideCardData['content'];
        guideCardItem['guideDate'] = date_fns.format(guideCardData['guideDate'], 'yyyy.MM.dd');
        guideCardItem['startTime'] = guideCardData['startTime'];
        guideCardItem['endTime'] = guideCardData['endTime'];
        guideCardItem['numPeople'] = guideCardData['numPeople'];
        guideCardItem['state'] = guideCardData['state'];
        guideCardItem['address'] = guideCardData['address'];
        guideCardItem['latitude'] = guideCardData['latitude'];
        guideCardItem['longitude'] = guideCardData['longitude'];
        guideCardItem['openDate'] = guideCardData['openDate'];
        guideCardItem['userId'] = guideCardData['userId'];
        guideCardItem['nickName'] = userData['nickName'];
        guideCardItem['gender'] = userData['gender'];
        guideCardItem['createdAt'] = date_fns.format(guideCardData['createdAt'], 'yyyy.MM.dd');
        guideCardItem['updatedAt'] = date_fns.format(guideCardData['updatedAt'], 'yyyy.MM.dd');
        if (userData['image']) {
          guideCardItem['userImage'] = userData['image'];
        } else {
          guideCardItem['userImage'] = '/asset/main/stamp.png';
        }
        if (guideImageData.length > 0) {
          guideCardItem['tourImage'] = guideImageData[0].dataValues.image;
        } else {
          guideCardItem['tourImage'] = '/asset/else/trip.jpg';
        }

        guideCardList.push(guideCardItem);
      }
      resObject['code'] = 200;
      resObject['message'] = '가이드 카드를 조회했습니다';
      resObject['guideCardList'] = guideCardList;
    } catch (error) {
      console.log(error);
      resObject['code'] = 400;
      resObject['message'] = error;
      resObject['guideCardList'] = [];
    }
    return resObject;
  },

  selectGuideCardById: async (req) => {
    const resObject = { code: 200 };

    const selectGuideCard = await guide_card.findOne({
      include: [
        {
          model: user,
          attributes: ['nickName', 'gender'],
        },
        {
          model: guide_image,
          order: ['id', 'ASC'],
        },
      ],
      where: { guideId: req.query.guideId },
    });

    const guideCardData = selectGuideCard.dataValues;
    const guideUserData = guideCardData.user.dataValues;
    const guideImageData = guideCardData.guide_images;

    const guideCard = {};
    guideCard['guideId'] = guideCardData['guideId'];
    guideCard['title'] = guideCardData['title'];
    guideCard['content'] = guideCardData['content'];
    guideCard['guideDate'] = date_fns.format(guideCardData['guideDate'], 'yyyy.MM.dd');
    guideCard['startTime'] = guideCardData['startTime'];
    guideCard['endTime'] = guideCardData['endTime'];
    guideCard['numPeople'] = guideCardData['numPeople'];
    guideCard['state'] = guideCardData['state'];
    guideCard['address'] = guideCardData['address'];
    guideCard['latitude'] = guideCardData['latitude'];
    guideCard['longitude'] = guideCardData['longitude'];
    guideCard['openDate'] = guideCardData['openDate'];
    guideCard['userId'] = guideCardData['userId'];
    guideCard['nickName'] = guideUserData['nickName'];
    guideCard['gender'] = guideUserData['gender'];
    if (guideUserData['image']) {
      guideCard['userImage'] = guideUserData['image'];
    } else {
      guideCard['userImage'] = '/asset/main/stamp.png';
    }
    guideCard['createdAt'] = date_fns.format(guideCardData['createdAt'], 'yyyy.MM.dd');
    guideCard['updatedAt'] = date_fns.format(guideCardData['updatedAt'], 'yyyy.MM.dd');

    const accessToken = isAuthorized(req);
    if (!accessToken) {
      guideCard['userParticipate'] = 0;
    } else {
      const selectGuideUserParticipate = await guide_user_participate.findOne({
        raw: true,
        where: { guideId: req.query.guideId, userId: accessToken.userId },
      });

      if (selectGuideUserParticipate) {
        guideCard['userParticipate'] = 1;
      } else {
        guideCard['userParticipate'] = 0;
      }
    }

    const tourImage = [];
    if (guideImageData.length > 0) {
      for (let guideImageDataItem of guideImageData) {
        tourImage.push(guideImageDataItem.dataValues.image);
      }
    } else {
      tourImage.push('/asset/logo/logo.png');
    }

    guideCard['tourImage'] = tourImage;

    resObject['guideCard'] = guideCard;

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
        },
        order: [['createdAt', 'DESC']],
      });

      if (!guideCard || guideCard.state === 'CANCELED') {
        throw '진행 중인 가이드가 없습니다';
      }

      const guideImages = await guide_image.findAll({
        raw: true,
        where: { guideId: guideCard.guideId },
        order: [['guideId', 'ASC']],
      });

      const tourImage = [];
      for (let guideImage of guideImages) {
        tourImage.push(guideImage.image);
      }

      const guideData = {
        guideId: guideCard.guideId,
        title: guideCard.title,
        content: guideCard.content,
        guideDate: date_fns.format(guideCard['guideDate'], 'yyyy.MM.dd'),
        startTime: guideCard.startTime,
        endTime: guideCard.endDate,
        count: guideCard.numPeople,
        state: guideCard.state,
        address: guideCard.address,
        openDate: guideCard.openDate,
        userId: guideCard.userId,
        tourImage: tourImage,
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
          userInfoItem['nickName'] = userInfo['user.nickName'];
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
