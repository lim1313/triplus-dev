import { ADMIN_USER, ADMIN_OPEN, LOGOUT_ADMIN_USER } from './type';

export function adminReducer(state = {}, action) {
  switch (action.type) {
    case ADMIN_USER:
      return {
        ...state,
        isAdmin: action.payload.success,
        message: action.payload.message,
      };
    case LOGOUT_ADMIN_USER:
      return {
        ...state,
        isAdmin: action.payload.success,
        message: action.payload.message,
      };
    default:
      return state;
  }
}

export function adminOpenReducer(state = false, action) {
  switch (action.type) {
    case ADMIN_OPEN:
      return {
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
}
