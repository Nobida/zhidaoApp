//
// Today
// --------------------------------------------------


import { getToday } from "../api/today";
import bindApiKey from '../utils/bindApiKey';

export const FETCH_TODAY = 'FETCH_TODAY';
export const FETCH_TODAY_PENDING = 'FETCH_TODAY_PENDING';
export const FETCH_TODAY_FULFILLED = 'FETCH_TODAY_FULFILLED';
export const FETCH_TODAY_REJECTED = 'FETCH_TODAY_REJECTED';

export function fetchToday() {
  return {
    type: FETCH_TODAY,
    payload: bindApiKey(getToday)
  };
}
