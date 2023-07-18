import axios, {AxiosError, AxiosInstance as AxiosInstanceType} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BACK_URL} from '../_common/back.url';

// export const CLIENT = axios.create();
export const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

class AxiosInstance {
  private readonly instance: AxiosInstanceType;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });
    this.setInterceptor();
  }

  get getInstance() {
    return this.instance;
  }

  private setInterceptor() {
    this.instance.interceptors.request.use(async config => {
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

      return;
    });

    this.instance.interceptors.response.use(
      response => response,
      async error => {
        const {refreshToken} = error.config.headers;
        if (error.reponse && error.reponse.status === 401) {
          try {
            const {status, data} = await axios({
              url: 'http://3.35.136.100:9595/users/refresh/token',
              method: 'GET',
              headers: {
                Authorization: refreshToken,
              },
            });

            if (status && data) {
              await AsyncStorage.setItem(
                'access_token',
                data.reponse.accessToken,
              );

              await AsyncStorage.setItem(
                'refresh_token',
                data.response.refreshToken,
              );

              return await this.instance.request(error.config);
            }
          } catch (e: any) {
            if (e instanceof AxiosError && e.response) {
              const code = e.response.status;

              if (code === 500) {
                console.log({
                  type: 'error',
                  position: 'top',
                  text1: '서버 에러',
                  visibilityTime: 2000,
                });
              }
            }
          }
          return Promise.reject(error);
        }
        return Promise.reject(error);
      },
    );
  }
}

export const userAPI = new AxiosInstance(`http://${BACK_URL}/users/`)
  .getInstance;
