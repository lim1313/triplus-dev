import axios from 'axios';

export const checkId = (data) => {
  return axios.get(`http://localhost/signup?userId=${data}`).then((res) => {
    return res;
  });
};
