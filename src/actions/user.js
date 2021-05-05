//
// User
// --------------------------------------------------


import { getUserStat } from "../api/user";
import bindApiKey from '../utils/bindApiKey';

export const FETCH_USER_STAT = 'FETCH_USER_STAT';
export const FETCH_USER_STAT_PENDING = 'FETCH_USER_STAT_PENDING';
export const FETCH_USER_STAT_FULFILLED = 'FETCH_USER_STAT_FULFILLED';
export const FETCH_USER_STAT_REJECTED = 'FETCH_USER_STAT_REJECTED';

export function fetchUserStat() {
  return {
    type: FETCH_USER_STAT,
    payload: bindApiKey(getUserStat)
  };
}
