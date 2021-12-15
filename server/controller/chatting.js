const { isAuthorized } = require('./functions/user');
const { chat_member, chat_room } = require('./../models');
const { Op } = require('sequelize');

module.exports = {
  createChatRoom: async (req, res) => {
    const { userId } = req.body;
    const verifed = isAuthorized(req);
    if (!verifed) return res.status(400).send('채팅을 하기 위해 로그인을 진행해주세요');
    const myId = verifed.userId;

    let roomAlready = 0;
    let alreadyLeft = false;

    try {
      const myRooms = await chat_member.findAll({
        raw: true,
        where: { userId: myId, left: { [Op.eq]: null } },
      });
      const partnerRooms = await chat_member.findAll({
        raw: true,
        where: { userId: userId, left: { [Op.eq]: null } },
      });

      for (let myRoom of myRooms) {
        for (let partnerRoom of partnerRooms) {
          if (myRoom.roomId === partnerRoom.roomId) {
            roomAlready = myRoom.roomId;
            break;
          }
        }
      }
      if (roomAlready) {
        return res.status(200).json({ data: roomAlready, message: '이미 방이 존재합니다' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send('잠시 후에 다시 시도해주시기 바랍니다');
    }

    let createdRoomId;

    try {
      const createdRoom = await chat_room.create({ message: JSON.stringify([]) });
      const joinRoom = await chat_member.bulkCreate([
        { userId: userId, roomId: createdRoom.dataValues.roomId, count: 0 },
        { userId: myId, roomId: createdRoom.dataValues.roomId, count: 0 },
      ]);
      createdRoomId = createdRoom.dataValues.roomId;
    } catch (err) {
      console.log(err);
      res.status(500).send('방을 생성하지 못했습니다');
    }

    res.status(201).json({ data: createdRoomId, message: '방이 성공적으로 생성되었습니다' });
  },
};
