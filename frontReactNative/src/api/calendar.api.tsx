import {CLIENT} from './client';

export const CalendarListAPI = async () => await CLIENT.get('calendar');
