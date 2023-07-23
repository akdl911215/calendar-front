import axios from 'axios';
import {BACK_URL} from '../_common/back.url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AxiosError} from 'axios/index';

export const CLIENT = axios.create({
  baseURL: `http://${BACK_URL}`,
});

CLIENT.interceptors.request.use(
  async function (config) {
    const [accessToken, refreshToken] = await Promise.all([
      AsyncStorage.getItem('access_token'),
      AsyncStorage.getItem('refresh_token'),
    ]);

    if (!accessToken && config.headers) {
      config.headers.Authorization = '';
      config.headers.refreshToken = '';
    }

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers.refreshToken = `Bearer ${refreshToken}`;
    }

    return Promise.resolve(config);
  },
  async function (error) {
    return Promise.reject(error);
  },
);

CLIENT.interceptors.response.use(
  response => response,
  async error => {
    const {refreshToken} = error.config.headers;

    if (error.response && error.response.status === 401) {
      try {
        const {status, data} = await axios({
          url: 'http://3.35/136.100:9595/users/refresh/token',
          method: 'GET',
          headers: {
            Authorization: refreshToken,
          },
        });

        if (status && data) {
          await AsyncStorage.setItem('access_token', data.response.accessToken);

          await AsyncStorage.setItem(
            'refresh_token',
            data.response.refreshToken,
          );

          return await axios.request(error.conig);
        }
      } catch (e: any) {
        if (e instanceof AxiosError && e.response) {
          const code = e.response.status;

          if (code === 500) {
            console.log({
              type: 'error',
              position: 'top',
              text1: '서버 에러',
              visibilityTime: 200,
            });
          }
        }
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);
