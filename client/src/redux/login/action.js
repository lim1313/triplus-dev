import axios from 'axios';
import { LOGIN_USER, LOGOUT_USER } from './type';
// import { logOut } from '../../network/login/http';
// axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Content-Type'] = 'application/json';

// const http = process.env.REACT_APP_HTTPURL;

export const loginUser = (dataToSubmit) => (dispatch) => {
  axios
    .post(`http://localhost/login`, dataToSubmit)
    .then((response) => response.data)
    .then((res) => {
      dispatch({
        type: LOGIN_USER,
        payload: { success: res.success, message: res.message },
      });
    });
};

export const logoutUser = () => (dispatch) => {
  axios.get(`http://localhost/logout`, { crossDomain: true }).then((response) => {
    if (response.data.success) {
      dispatch({ type: LOGOUT_USER });
    }
  });
};
