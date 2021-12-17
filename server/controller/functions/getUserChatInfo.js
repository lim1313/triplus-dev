const { chat_room, chat_member, user } = require('../../models');
const { Op } = require('sequelize');
const { verify } = require('jsonwebtoken');

module.exports = {
  isSocketAuthorized: (accessToken) => {
    if (!accessToken) return null;
    try {
      return verify(accessToken, process.env.ACCESS_SECRET);
    } catch (err) {
      console.log(err);
      return '500';
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
      console.log(error);
      return resObject;
    }

    try {
      // > 로그인한 유저가 속한 채팅방 조회
      const chatMembers = await chat_member.findAll({
        // raw: true 는 chaMembers 내의 객체를 한 줄로 풀어주는 작업
        raw: true,
        where: {
          userId: userInfo.userId,
          left: { [Op.eq]: null },
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
            attributes: ['roomId', 'left'],
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
        for (let chatRoomInfo of chatMembers) {
          for (let chatRoomAndMember of chatRoomAndMembers) {
            if (chatRoomInfo.roomId === chatRoomAndMember.roomId) {
              chatRooms.push({
                roomId: chatRoomAndMember.roomId,
                chatPartnerId: chatRoomAndMember['user.userId'],
                chatPartnerNickName: chatRoomAndMember['user.nickName'],
                partnerLeft: chatRoomAndMember['left'],
                count: chatRoomInfo.count,
              });
            }
          }
        }

        resObject['userId'] = userInfo.userId;
        resObject['nickname'] = userInfo.nickName;
        resObject['chatRooms'] = chatRooms;
      }

      return resObject;
    } catch (err) {
      return '500';
    }
  },

  getPartnerChatInfo: async (selectedRoom, userId) => {
    try {
      let resObject = {
        userId: '',
        nickname: '',
        chatRooms: [],
      };

      const partnerInfos = await chat_member.findOne({
        raw: true,
        where: {
          roomId: selectedRoom,
          userId: { [Op.ne]: userId },
        },
      });
      const partnerId = partnerInfos.userId;
      const partnerUserInfo = await user.findOne({
        raw: true,
        where: { userId: partnerId },
      });

      // > 로그인한 유저가 속한 채팅방 조회
      const partnerChatMembers = await chat_member.findAll({
        // raw: true 는 chaMembers 내의 객체를 한 줄로 풀어주는 작업
        raw: true,
        where: {
          userId: partnerUserInfo.userId,
          left: { [Op.eq]: null },
        },
      });

      // > Room의 id 를 찾기 위한 조건
      const partnerChatRoomCondition = {};

      if (partnerChatMembers.length > 0) {
        partnerChatRoomCondition[Op.or] = [];

        // > 지금 로그인한 사람이 들어가 있는 채팅방의 roomId를 다 Push 해준다.
        for (let chatMember of partnerChatMembers) {
          partnerChatRoomCondition[Op.or].push({ roomId: chatMember.roomId });
        }
        const chatRoomAndMembers = await chat_member
          .findAll({
            raw: true,
            attributes: ['roomId', 'left'],
            include: [
              {
                model: user,
                attributes: ['userId', 'nickName'],
                where: { userId: { [Op.ne]: partnerUserInfo.userId } },
              },
            ],
            where: partnerChatRoomCondition,
          })
          .catch((err) => console.log(err));

        if (chatRoomAndMembers === undefined) return resObject;

        const chatRooms = [];

        for (let chatRoomInfo of partnerChatMembers) {
          for (let chatRoomAndMember of chatRoomAndMembers) {
            if (chatRoomInfo.roomId === chatRoomAndMember.roomId) {
              chatRooms.push({
                roomId: chatRoomAndMember.roomId,
                chatPartnerId: chatRoomAndMember['user.userId'],
                chatPartnerNickName: chatRoomAndMember['user.nickName'],
                partnerLeft: chatRoomAndMember['left'],
                count: chatRoomInfo.count,
              });
            }
          }
        }

        resObject['userId'] = partnerUserInfo.userId;
        resObject['nickname'] = partnerUserInfo.nickName;
        resObject['chatRooms'] = chatRooms;
      }

      return resObject;
    } catch (err) {
      return '500';
    }
  },

  getChatContents: async (selectedRoom) => {
    try {
      const messages = await chat_room.findOne({
        raw: true,
        attributes: ['message'],
        where: { roomId: selectedRoom },
      });
      return messages.message;
    } catch (err) {
      console.log(err);
      return '500';
    }
  },

  resetNoticeCount: async (selectedRoom, userId) => {
    try {
      const reset = await chat_member.update(
        { count: 0 },
        { where: { roomId: selectedRoom, userId: userId } }
      );
      if (reset.length > 0) return 'success';
      return false;
    } catch {
      return '500';
    }
  },

  updateMessage: async (messageUpdate, selectedRoom, userId) => {
    try {
      const currentRoomInfo = await chat_room.findOne({
        raw: true,
        where: { roomId: selectedRoom },
      });
      const parsedMessage = JSON.parse(currentRoomInfo.message);
      parsedMessage.push(messageUpdate);
      const stringifiedNewMessage = JSON.stringify(parsedMessage);

      await chat_room.update(
        {
          message: stringifiedNewMessage,
        },
        { where: { roomId: selectedRoom } }
      );

      const partnerInfo = await chat_member.findOne({
        where: { roomId: selectedRoom, userId: { [Op.ne]: userId } },
      });

      await chat_member.update(
        { count: partnerInfo.count + 1 },
        { where: { roomId: selectedRoom, userId: partnerInfo.userId } }
      );

      return 'success';
    } catch {
      return '500';
    }
  },

  deleteRoom: async (selectedRoom, userId) => {
    try {
      const destroy = await chat_member.update(
        { left: 'left' },
        { where: { roomId: selectedRoom, userId: userId } }
      );
      const leftRooms = await chat_member.findAll({
        raw: true,
        where: { roomId: selectedRoom, left: 'left' },
      });

      if (leftRooms.length > 1) {
        // join table 일 때, 1:N 의 경우, N 먼저 destroy
        // N 을 먼저 지우면 무조건 에러가 뜬다. roomId 를 먼저 참조하고 있다며 에러가 뜰 것
        const destroyAllMembers = await chat_member.destroy({ where: { roomId: selectedRoom } });
        const destroyAllRoom = await chat_room.destroy({ where: { roomId: selectedRoom } });
        if (!(destroyAllMembers && destroyAllRoom)) return false;
      }

      if (!!destroy) return 'success';
      return false;
    } catch (err) {
      console.log(err);
      return '500';
    }
  },
};
