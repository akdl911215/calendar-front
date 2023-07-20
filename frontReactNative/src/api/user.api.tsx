import {CLIENT} from './client';

interface UserSignIn {
  readonly appId: string;
  readonly password: string;
}
export const SignInDataAPI = async (user: UserSignIn) =>
  await CLIENT.post(`users/login`, user);
