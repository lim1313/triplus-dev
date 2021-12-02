import axios from 'axios';

const http = process.env.REACT_APP_HTTPSURL;

export const checkId = (data) => {
  return axios.get(`${http}/signup?userId=${data}`).then((res) => {
    return res;
  });
};

export const signUp = (data) => {
  return axios.post(`${http}/signup`, data).then((res) => res);
};

export const emailCheck = (data) => {
  return axios.get(`${http}/signup/email-check?userEmail=${data}`);
};
