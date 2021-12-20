import axios from 'axios';
import { ADMIN_USER, ADMIN_OPEN, LOGOUT_ADMIN_USER } from './type';

const http = process.env.REACT_APP_HTTPSURL;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const adminUser = (dataTosubmit) => (dispatch) => {
  axios
    .post(`${http}/login`, dataTosubmit)
    .then((response) => response.data)
    .then((res) => {
      dispatch({
        type: ADMIN_USER,
        payload: { success: res.success, message: res.message },
      });
      if (res.success) {
        dispatch(adminOpen());
      }
    })
    .catch((err) => alert(err));
};

export const logoutAdminUser = () => (dispatch) => {
  axios.get(`${http}/logout`, { crossDomain: true }).then((res) => {
    if (res.data.success) {
      dispatch({
        type: LOGOUT_ADMIN_USER,
        payload: { success: '', meesage: '' },
      });
      dispatch(adminOpen());
    }
  });
};

export const adminOpen = () => {
  return {
    type: ADMIN_OPEN,
  };
};
