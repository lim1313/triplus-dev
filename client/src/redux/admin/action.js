import axios from 'axios';
import { ADMIN_USER, ADMIN_OPEN } from './type';

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
    })
    .then((res) => {
      dispatch(adminOpen());
    })
    .catch((err) => console.log(err));
};

export const adminOpen = () => {
  return {
    type: ADMIN_OPEN,
  };
};
