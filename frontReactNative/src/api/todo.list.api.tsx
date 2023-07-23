import {CLIENT} from './client';

export const TodoListInquiryAPI = async () => await CLIENT.get(`calendar`);

export const TodoListAPI = async (month: number) =>
  await CLIENT.get(`calendar/list?month=${month}`);
