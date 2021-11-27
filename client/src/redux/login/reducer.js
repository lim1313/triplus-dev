import { LOGIN_USER } from './type';

export default function loginReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, isLogin: action.payload };
    default:
      return state;
  }
}
