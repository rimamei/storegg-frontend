import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

interface CallApiProps extends AxiosRequestConfig {
  token?: boolean;
  serverToken?: string;
}

export default async function callAPI({
  url,
  method,
  data,
  token,
  serverToken,
}: CallApiProps) {
  let headers = {};

  if (serverToken) {
    headers = { Authorization: 'Bearer ' + serverToken };
  } else if (token) {
    const tokenCookies = Cookies.get('token');
    if (tokenCookies) {
      const jwtToken = atob(tokenCookies);
      headers = { Authorization: 'Bearer ' + jwtToken };
    }
  }

  const response = await axios({ url, method, data, headers }).catch(
    (err) => err.response
  );

  const { length } = Object.keys(response.data);

  let res = {
    error: false,
    message: 'success',
    data: length > 1 ? response.data : response.data.data,
  };

  if (response?.status > 300) {
    res = {
      error: true,
      message: response.data.message,
      data: null,
    };
  }

  return res;
}
