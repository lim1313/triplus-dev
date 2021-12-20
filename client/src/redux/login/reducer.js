import { EXIT_USER, LOGIN_USER, LOGOUT_USER, OAUTH_LOGIN, SET_MESSAGE } from './type';

export default function loginReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isLogin: action.payload.success,
        message: action.payload.message,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLogin: false,
        message: '',
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: '',
      };
    case OAUTH_LOGIN:
      return {
        ...state,
        isLogin: true,
      };
    case EXIT_USER:
      return {
        ...state,
        isLogin: false,
        message: '',
      };
    default:
      return state;
  }
}
