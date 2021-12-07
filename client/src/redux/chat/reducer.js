import { USER_CHAT_INFO, CHAT_LIST } from './type';

const chatUserInitialState = {
  userId: '',
  nickname: '',
  chatPartner: [],
};

const chatListInitialState = [];

export const chatUserInfoReducer = (state = chatUserInitialState, action) => {
  switch (action.type) {
    case USER_CHAT_INFO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const chatListReducer = (state = chatListInitialState, action) => {
  switch (action.type) {
    case CHAT_LIST:
      return [...state, action.payload.chatList];
    default:
      return state;
  }
};
