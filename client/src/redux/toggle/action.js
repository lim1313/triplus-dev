import { TOGGLE_OPEN, TOGGLE_CLOSE } from './type';

export const toggleOpen = () => {
  return {
    type: TOGGLE_OPEN,
    payload: {
      isToggled: true,
    },
  };
};

export const toggleClose = () => {
  return {
    type: TOGGLE_CLOSE,
    payload: {
      isToggled: false,
    },
  };
};
