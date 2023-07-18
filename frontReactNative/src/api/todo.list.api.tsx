import {CLIENT} from './client';
import {BACK_URL} from '../_common/back.url';

export const TodoListInquiryAPI = async () => {
  const a = await CLIENT.get(`http://${BACK_URL}/calendar`);

  console.log('a : ', a);
  return a;
};

export const TodoListListAPI = async () =>
  await CLIENT.get(`http://${BACK_URL}/calendar/list`);
