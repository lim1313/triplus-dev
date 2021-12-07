import { USER_CHAT_INFO, CHAT_LIST } from './type';

export const getUserChatInfo = (userId, nickname, chatPartner) => {
  return {
    type: USER_CHAT_INFO,
    payload: {
      userId: userId,
      nickname: nickname,
      chatPartner: [...chatPartner],
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
