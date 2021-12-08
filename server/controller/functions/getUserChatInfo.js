const { chat_member, user } = require('../../models');
const { Op } = require('sequelize');
const { verify } = require('jsonwebtoken');

module.exports = {
  isSocketAuthorized: (accessToken) => {
    if (!accessToken) return null;
    try {
      return verify(accessToken, process.env.ACCESS_SECRET);
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  getUserChatInfo: async (userInfo) => {
    let resObject = {
      userId: '',
      nickname: '',
      chatRooms: [],
    };

    try {
      if (!userInfo) {
        throw '해당 유저가 없습니다';
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
      return resObject;
    }

    // > 로그인한 유저가 속한 채팅방 조회
    const chatMembers = await chat_member.findAll({
      // raw: true 는 chaMembers 내의 객체를 한 줄로 풀어주는 작업
      raw: true,
      where: {
        userId: userInfo.userId,
      },
    });

    // > Room의 id 를 찾기 위한 조건
    const myChatRoomCondition = {};

    if (chatMembers.length > 0) {
      myChatRoomCondition[Op.or] = [];

      // > 지금 로그인한 사람이 들어가 있는 채팅방의 roomId를 다 Push 해준다.
      for (let chatMember of chatMembers) {
        myChatRoomCondition[Op.or].push({ roomId: chatMember.roomId });
      }

      const chatRoomAndMembers = await chat_member
        .findAll({
          raw: true,
          attributes: ['roomId'],
          include: [
            {
              model: user,
              attributes: ['userId', 'nickName'],
              // > [Op.ne] => no equal <>
              where: { userId: { [Op.ne]: userInfo.userId } },
            },
          ],
          where: myChatRoomCondition,
        })
        .catch((err) => console.log(err));

      if (chatRoomAndMembers === undefined) return resObject;

      const chatRooms = [];
      for (let chatRoomAndMember of chatRoomAndMembers) {
        chatRooms.push({
          roomId: chatRoomAndMember.roomId,
          chatPartnerId: chatRoomAndMember['user.userId'],
          chatPartnerNickName: chatRoomAndMember['user.nickName'],
        });
      }

      resObject['userId'] = userInfo.userId;
      resObject['nickname'] = userInfo.nickName;
      resObject['chatRooms'] = chatRooms;
    }

    return resObject;
  },
};
