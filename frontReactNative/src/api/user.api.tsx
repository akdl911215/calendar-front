import {CLIENT} from './client';

interface UserSignIn {
  readonly appId: string;
  readonly password: string;
}

interface UserUpdateAppId {
  readonly id: string;
  readonly appId: string;
}

interface UserUpdateNickname {
  readonly id: string;
  readonly nickname: string;
}

interface UserUpdatePhone {
  readonly id: string;
  readonly phone: string;
}

interface UsersUpdateEmail {
  readonly id: string;
  readonly email: string;
}

interface UserSignUp {
  readonly appId: string;
  readonly password: string;
  readonly email: string;
  readonly phone: string;
  readonly nickname: string;
}

export const SignUpDataAPI = async (user: UserSignUp) =>
  await CLIENT.post('users', user);

export const SignInDataAPI = async (user: UserSignIn) =>
  await CLIENT.post(`users/login`, user);

export const InquiryDataAPI = async () => await CLIENT.get('users');

export const UpdateAppIdDataAPI = async (user: UserUpdateAppId) =>
  await CLIENT.patch('users/update/appId', user);

export const UpdateNicknameDataAPI = async (user: UserUpdateNickname) =>
  await CLIENT.patch('users/update/nickname', user);

export const UpdatePhoneDataAPI = async (user: UserUpdatePhone) =>
  await CLIENT.patch('users/update/phone', user);

export const UpdateEmailDataAPI = async (user: UsersUpdateEmail) =>
  await CLIENT.patch('users/update/email', user);

export const DuplicateVerificationAppId = async (appId: string) =>
  await CLIENT.get(`users/duplicate/verification/appId/${appId}`);

export const DuplicateVerificationEmail = async (email: string) =>
  await CLIENT.get(`users/duplicate/verification/email/${email}`);

export const DuplicateVerificationPhone = async (phone: string) =>
  await CLIENT.get(`users/duplicate/verification/phone/${phone}`);

export const DuplicateVerificationNickname = async (nickname: string) =>
  await CLIENT.get(`users/duplicate/verification/nickname/${nickname}`);
