import { LOGIN_USER } from './type';

export default function loginReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isLogin: action.payload.success,
        message: action.payload.message,
      };
    default:
      return state;
  }
}
