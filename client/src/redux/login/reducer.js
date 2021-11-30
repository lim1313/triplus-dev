import { LOGIN_USER, LOGOUT_USER } from './type';

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
    default:
      return state;
  }
}
