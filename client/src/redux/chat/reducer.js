import { USER_CHAT_INFO, CURRENT_ROOM, CHAT_LIST, CHAT_RESET } from './type';

const chatUserInitialState = {
  userId: '',
  nickname: '',
  chatRooms: [],
};

const currentRoomInitialState = {
  currentRoom: '',
};

const chatListInitialState = {
  chatList: [],
};

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

export const currentRoomReducer = (state = currentRoomInitialState, action) => {
  switch (action.type) {
    case CURRENT_ROOM:
      return {
        currentRoom: action.payload.currentRoom,
      };
    default:
      return state;
  }
};

export const chatListReducer = (state = chatListInitialState, action) => {
  switch (action.type) {
    case CHAT_LIST:
      return {
        chatList: [...state.chatList, ...action.payload.chatList],
      };
    case CHAT_RESET:
      return {
        chatList: [...action.payload.chatList],
      };
    default:
      return state;
  }
};
