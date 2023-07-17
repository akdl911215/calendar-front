import {CLIENT} from './client';
import {BACK_URL} from '../_common/back.url';

interface TodoListInquiry {
  readonly month: number;
  readonly day: number;
}
export const TodoListInquiryAPI = async (todoList: TodoListInquiry) =>
  await CLIENT.get(
    `http://${BACK_URL}/calendar?month=${todoList.month}&day=${todoList.day}`,
  );
