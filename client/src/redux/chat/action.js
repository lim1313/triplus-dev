import { USER_CHAT_INFO, CHAT_LIST } from './type';

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

export const getChatList = (chatList) => {
  return {
    type: CHAT_LIST,
    payload: {
      chatList: chatList,
    },
  };
};
