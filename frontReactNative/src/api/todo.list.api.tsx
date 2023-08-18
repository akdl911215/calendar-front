import {CLIENT} from './client';

export const TodoListInquiryAPI = async () => await CLIENT.get(`calendar`);

export const TodoListAPI = async (month: number) => {
  console.log('month : ', month);
  return await CLIENT.get(`calendar/list?month=${month}`);
};
