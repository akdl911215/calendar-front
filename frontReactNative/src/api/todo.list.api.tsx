import {CLIENT} from './client';

export const TodoListInquiryAPI = async () => await CLIENT.get(`calendar`);

export const TodoListListAPI = async () => await CLIENT.get(`calendar/list`);
