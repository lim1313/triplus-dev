import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const checkToken = () => {
  axios.get(`http://localhost/login`);
};

export const logOut = () => {
  axios
    .get(`http://localhost/logout`, {
      crossDomain: true,
    })
    .then((res) => res);
};
