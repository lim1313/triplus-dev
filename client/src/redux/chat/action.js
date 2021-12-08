import { USER_CHAT_INFO, CURRENT_ROOM, CHAT_LIST, CHAT_RESET } from './type';

export const getUserChatInfo = (data) => {
  return {
    type: USER_CHAT_INFO,
    payload: {
      userId: data.userId,
      nickname: data.nickname,
      chatRooms: [...data.chatRooms],
    },
  };
};

export const changeCurrentRoom = (selectedRoom) => {
  return {
    type: CURRENT_ROOM,
    payload: {
      currentRoom: selectedRoom,
    },
  };
};

export const getChatList = (chatList) => {
  return {
    type: CHAT_LIST,
    payload: {
      chatList: chatList,
    },
  };
};

export const resetChatList = (chatList) => {
  return {
    type: CHAT_RESET,
    payload: {
      chatList: chatList,
    },
  };
};
