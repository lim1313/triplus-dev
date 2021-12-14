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

export const googleOauth = (authorizationCode) =>
  axios.post(
    `${http}/oauth/google`,
    { authorizationCode },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

export const naverOauth = (authorizationCode, state) =>
  axios.post(
    `${http}/oauth/navercallback`,
    { authorizationCode, state },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

export const kakaoOauth = (authorizationCode) =>
  axios.post(`${http}/oauth/kakaocallback`, { authorizationCode });
