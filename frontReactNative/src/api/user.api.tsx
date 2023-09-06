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

export const UpdateDataAPI = async (user: UserUpdate) =>
  await CLIENT.patch('users/update', user);

export const DuplicateVerificationAppId = async (appId: string) =>
  await CLIENT.get(`users/duplicate/verification/appId/${appId}`);

export const DuplicateVerificationEmail = async (email: string) =>
  await CLIENT.get(`users/duplicate/verification/email/${email}`);

export const DuplicateVerificationPhone = async (phone: string) =>
  await CLIENT.get(`users/duplicate/verification/phone/${phone}`);

export const DuplicateVerificationNickname = async (nickname: string) =>
  await CLIENT.get(`users/duplicate/verification/nickname/${nickname}`);
