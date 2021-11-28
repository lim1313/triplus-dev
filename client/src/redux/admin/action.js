import axios from 'axios';
import { ADMIN_USER, ADMIN_OPEN } from './type';

export const adminUser = (dataTosubmit) => (dispatch) => {
  axios
    .post(`http://localhost/login`, dataTosubmit)
    .then((response) => response.data)
    .then((res) => {
      dispatch({
        type: ADMIN_USER,
        payload: { success: res.success, message: res.message },
      });
    });
};

export const adminOpen = () => {
  return {
    type: ADMIN_OPEN,
  };
};
