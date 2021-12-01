import axios from 'axios';

const http = process.env.REACT_APP_HTTPSURL;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const checkToken = () => {
  axios.get(`${http}/login`);
};

export const logOut = () => {
  axios
    .get(`${http}/logout`, {
      crossDomain: true,
    })
    .then((res) => res);
};
