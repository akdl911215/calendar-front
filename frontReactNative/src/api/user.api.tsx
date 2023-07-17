import {CLIENT} from './client';
import {BACK_URL} from '../_common/back.url';

interface UserSignIn {
  readonly appId: string;
  readonly password: string;
}
export const SignInDataAPI = async (user: UserSignIn) =>
  await CLIENT.post(`http://${BACK_URL}/users/login`, user);
