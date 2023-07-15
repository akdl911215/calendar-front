// 'http://15.164.39.69:9595/users/login'

import {CLIENT} from './client';

export const SignInDataAPI = ({username: string, password: string}) =>
  CLIENT.post(`users/login`, {username, password});
