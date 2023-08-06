import {CLIENT} from './client';

interface UserSignIn {
  readonly appId: string;
  readonly password: string;
}

interface UserUpdate {
  readonly id: string;
  readonly appId: string;
  readonly nickname: string;
  readonly phone: string;
}
export const SignInDataAPI = async (user: UserSignIn) =>
  await CLIENT.post(`users/login`, user);

export const InquiryDataAPI = async () => await CLIENT.get('users');

export const UpdateDataAPI = async (user: UserUpdate) =>
  await CLIENT.patch('users/update', user);
