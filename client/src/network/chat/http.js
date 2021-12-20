import axios from 'axios';

const http = process.env.REACT_APP_HTTPSURL;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const createRoom = (userId) => {
  return axios
    .post(`${http}/chat/rooms`, { userId })
    .then((res) => res.data)
    .catch((err) => {
      return err.response.status;
    });
};
