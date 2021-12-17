const { isAuthorized } = require('./user');
const { Op } = require('sequelize');
const { guide_user_participate, guide_card, user, guide_image } = require('./../../models');
const { selectGuideCardById } = require('./../functions/guide_card');
const GLOBAL_VARIABLE = require('./global_variable');
const date_fns = require('date-fns');

module.exports = {
  createGuideUserParticipate: async (req) => {
    const resObject = {};
    const accessToken = isAuthorized(req);
    req.query.guideId = req.body.guideId;

    // 토큰이 없었을 때
    try {
      if (!accessToken) {
        throw 'accessToken이 없습니다';
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
      resObject['code'] = 401;
      resObject['message'] = error;
      return resObject;
    }

    const { guideCard } = await selectGuideCardById(req);

    // 가이드 신청자와 가이드 생성자가 같을 때
    if (accessToken.userId === guideCard.userId) {
      resObject['code'] = 200;
      resObject['message'] = 'main';

      return resObject;
    }

    // 참가인원이 다 찼을 때
    if (guideCard.state === GLOBAL_VARIABLE.FULL) {
      resObject['code'] = 200;
      resObject['message'] = 'end';

      return resObject;
    }

    // 중복 참가신청 됐을 때
    try {
      const guideUserParticipate = await guide_user_participate.findOne({
        where: {
          guideId: guideCard.guideId,
          userId: accessToken.userId,
        },
      });

      if (guideUserParticipate) {
        throw 'same';
      }
    } catch (error) {
      console.log(error);
      resObject['code'] = 200;
      resObject['message'] = error;

      return resObject;
    }

    // 참가신청이 됐을 때
    try {
      const guideUserParticipate = await guide_user_participate.create({
        guideId: guideCard.guideId,
        userId: accessToken.userId,
      });

      // 참가 신청이 되고 인원이 다찼을때
      const guideUserLength = await guide_user_participate.findAll({
        where: { guideId: guideCard.guideId },
      });
      if (guideCard.numPeople === guideUserLength.length) {
        await guide_card.update(
          {
            state: GLOBAL_VARIABLE.FULL,
          },
          {
            where: { guideId: guideCard.guideId },
          }
        );
      }

      resObject['code'] = 204;
      resObject['message'] = '참가신청이 되었습니다';

      return resObject;
    } catch (error) {
      console.log(error);
      resObject['code'] = 400;
      resObject['message'] = '참가신청이 되지않았습니다';

      return resObject;
    }
  },

  findGuideUserApproved: async (req, res) => {
    const resObject = {};
    const accessToken = isAuthorized(req);
    const pages = req.query.page;

    try {
      if (!accessToken) {
        resObject['code'] = 200;
        throw 'accessToken이 없습니다';
      }

      const guideList = await guide_user_participate
        .findAll({
          subQuery: false,
          where: {
            userId: accessToken.userId,
          },
          include: [
            {
              model: guide_card,
              where: {
                state: { [Op.ne]: GLOBAL_VARIABLE.COMPLETED },
              },
              include: [
                {
                  model: guide_image,
                },
                {
                  model: user,
                  attributes: ['nickName', 'gender', 'image'],
                },
              ],
            },
          ],
          order: [[guide_card, 'guideDate', req.query.sortBy]],
          offset: pages * 6 - 6,
          limit: 6,
        })
        .catch((error) => {
          console.log(error);
          resObject['code'] = 200;
        });

      const guideCardData = [];
      for (let guideItem of guideList) {
        const guideCard = guideItem.dataValues.guide_card.dataValues;
        const guideCardWriter = guideCard.user.dataValues;
        const guideCardImages = guideCard.guide_images;
        const guidePushData = {};
        guidePushData['guideId'] = guideCard['guideId'];
        guidePushData['title'] = guideCard['title'];
        guidePushData['content'] = guideCard['content'];
        guidePushData['guideDate'] = date_fns.format(guideCard['guideDate'], 'yyyy.MM.dd');
        guidePushData['startTime'] = guideCard['startTime'];
        guidePushData['endTime'] = guideCard['endTime'];
        guidePushData['address'] = guideCard['address'];
        guidePushData['openDate'] = guideCard['openDate'];
        guidePushData['state'] = guideCard['state'];
        guidePushData['userId'] = guideCard['userId'];
        guidePushData['nickName'] = guideCardWriter['nickName'];
        guidePushData['gender'] = guideCardWriter['gender'];
        if (guideCardWriter['image']) {
          guidePushData['userImage'] = guideCardWriter['image'];
        } else {
          guidePushData['userImage'] = '/asset/main/stamp.png';
        }

        if (guideCardImages.length > 0) {
          const guideImages = [];
          for (let guideCardImage of guideCardImages) {
            const guideImageData = guideCardImage.dataValues;
            guideImages.push(guideImageData.image);
          }
          guidePushData['tourImage'] = guideImages;
        } else {
          guidePushData['tourImage'] = ['/asset/else/trip.jpg'];
        }

        guideCardData.push(guidePushData);
      }

      resObject['code'] = 200;
      resObject['guideList'] = guideCardData;
    } catch (error) {
      console.log(`ERROR: ${error}`);
      resObject['message'] = error;
      return resObject;
    }

    return resObject;
  },

  findGuideUserCompleted: async (req, res) => {
    const resObject = {};
    const accessToken = isAuthorized(req);
    const pages = req.query.page;

    try {
      if (!accessToken) {
        resObject['code'] = 200;
        throw 'accessToken이 없습니다';
      }

      const guideList = await guide_user_participate
        .findAll({
          subQuery: false,
          where: {
            userId: accessToken.userId,
          },
          include: [
            {
              model: guide_card,
              where: {
                state: GLOBAL_VARIABLE.COMPLETED,
              },
              include: [
                {
                  model: guide_image,
                },
              ],
            },
            {
              model: user,
              attributes: ['nickName', 'gender', 'image'],
            },
          ],
          order: [[guide_card, 'guideDate', req.query.sortBy]],
          offset: pages * 6 - 6,
          limit: 6,
        })
        .catch((error) => {
          console.log(error);
          resObject['code'] = 200;
        });

      const guideCardData = [];
      for (let guideItem of guideList) {
        const guideCard = guideItem.dataValues.guide_card.dataValues;
        const guideCardWriter = guideItem.dataValues.user.dataValues;
        const guideCardImages = guideCard.guide_images;
        const guidePushData = {};
        guidePushData['guideId'] = guideCard['guideId'];
        guidePushData['title'] = guideCard['title'];
        guidePushData['content'] = guideCard['content'];
        guidePushData['guideDate'] = date_fns.format(guideCard['guideDate'], 'yyyy.MM.dd');
        guidePushData['startTime'] = guideCard['startTime'];
        guidePushData['endTime'] = guideCard['endTime'];
        guidePushData['address'] = guideCard['address'];
        guidePushData['openDate'] = guideCard['openDate'];
        guidePushData['state'] = guideCard['state'];
        guidePushData['userId'] = guideCardWriter['userId'];
        guidePushData['nickName'] = guideCardWriter['nickName'];
        guidePushData['gender'] = guideCardWriter['gender'];
        if (guideCardWriter['image']) {
          guidePushData['userImage'] = guideCardWriter['image'];
        } else {
          guidePushData['userImage'] = '/asset/main/stamp.png';
        }

        if (guideCardImages.length > 0) {
          const guideImages = [];
          for (let guideCardImage of guideCardImages) {
            const guideImageData = guideCardImage.dataValues;
            guideImages.push(guideImageData.image);
          }
          guidePushData['tourImage'] = guideImages;
        } else {
          guidePushData['tourImage'] = ['/asset/else/trip.jpg'];
        }

        guideCardData.push(guidePushData);
      }

      resObject['code'] = 200;
      resObject['guideList'] = guideCardData;
    } catch (error) {
      console.log(`ERROR: ${error}`);
      resObject['message'] = error;
      return resObject;
    }

    return resObject;
  },

  deleteData: async (req) => {
    const resObject = {};
    const accessToken = isAuthorized(req);

    try {
      if (!accessToken) {
        throw 'accessToken이 없습니다';
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
      resObject['code'] = 401;
      resObject['message'] = error;
      return resObject;
    }

    await guide_user_participate.destroy({
      where: {
        guideId: req.body.guideId,
        userId: accessToken.userId,
      },
    });

    const guideUser = await guide_user_participate.findAll({
      where: {
        guideId: req.body.guideId,
      },
    });

    const guideCard = await guide_card.findOne({
      where: {
        guideId: req.body.guideId,
      },
    });

    if (guideCard.numPeople > guideUser.length && guideCard.state === GLOBAL_VARIABLE.FULL) {
      await guide_card.update(
        {
          state: GLOBAL_VARIABLE.APPROVED,
        },
        {
          where: {
            guideId: req.body.guideId,
          },
        }
      );
    }

    resObject['code'] = 200;
    resObject['message'] = '참가신청이 취소되었습니다';
    return resObject;
  },
};
