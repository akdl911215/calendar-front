import axios from 'axios';
import {BACK_URL} from '../_common/back.url';

export const CLIENT = axios.create({
  baseURL: `http://${BACK_URL}`,
});
