import {atom} from 'recoil';

export const userModelState = atom({
  key: 'userState',
  default: {},
});
export const userSignUpModelState = atom({
  key: 'sigUpState',
  default: false,
});
