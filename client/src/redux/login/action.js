import axios from 'axios';
import { LOGIN_USER } from './type';

export function loginUser(dataToSubmit) {
  const request = axios.post('/login', dataToSubmit).then((response) => {
    return response.success;
  });

  return {
    type: LOGIN_USER,
    payload: request,
  };
}
