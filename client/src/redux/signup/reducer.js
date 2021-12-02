import { OPEN_MODAL } from './type';

const initialState = false;
export function openModalReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return !state;
    default:
      return state;
  }
}
