import { ADMIN_USER, ADMIN_OPEN } from './type';

export function adminReducer(state = {}, action) {
  switch (action.type) {
    case ADMIN_USER:
      return {
        ...state,
        isAdmin: action.payload.success,
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
