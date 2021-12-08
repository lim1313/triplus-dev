const {isAuthorized} = require('./functions/user');
const {chat_member, user} = require('./../models');
const {Op} = require('sequelize');

module.exports = {
  example: (req, res) => {
    res.status(200).send('this is example for chatting');
  },

  findChatRoomByUserId: async (req, res) => {
    let resObject = {chatRoom: []};
    const accessToken = isAuthorized(req);
    // 토큰이 없었을 때
    try {
      if(!accessToken){
        throw 'accessToken이 없습니다';
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
      resObject['code'] = 400;
      resObject['message'] = error;
      return resObject;
    }

    // 로그인한 유저가 속한 채팅방 조회
    const chatMembers = await chat_member.findAll({
      raw: true,
      where: {
        userId: accessToken.userId,
      }
    });

    const myChatRoomCondition = {};
    
    if(chatMembers.length > 0){
      myChatRoomCondition[Op.or] = [];

      for(let chatMember of chatMembers){
        myChatRoomCondition[Op.or].push({roomId: chatMember.roomId});
      }

      const chatRoomAndMembers = await chat_member({
        raw: true,
        attributes: ['roomId'],
        include: [
          {
            model: user,
            attributes: ['userId', 'nickName'],
            where: {[Op.ne]: {userId: accessToken.userId}}
          },
        ],
        where: myChatRoomCondition
      });

      const chatRooms = [];
      for(let chatRoomAndMember of chatRoomAndMembers){
        chatRooms.push({
          roomId: chatRoomAndMember.roomId,
          userId: chatRoomAndMember['user.userId'],
          nickName: chatRoomAndMember['user.nickName'],
        });
      }

      resObject['chatRoom'] = chatRooms;
    }

    return resObject;
  },
}