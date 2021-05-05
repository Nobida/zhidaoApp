//
// Book
// --------------------------------------------------

import { getAlertSetting,setAlertSetting } from "../api/alert_setting";
import bindApiKey from '../utils/bindApiKey';

export const FETCH_ALERT_SETTING = 'FETCH_ALERT_SETTING';
export const FETCH_ALERT_SETTING_PENDING = 'FETCH_ALERT_SETTING_PENDING';
export const FETCH_ALERT_SETTING_FULFILLED = 'FETCH_ALERT_SETTING_FULFILLED';
export const FETCH_ALERT_SETTING_REJECTED = 'FETCH_ALERT_SETTING_REJECTED';

export const CHANGE_ALERT_SETTING = 'CHANGE_ALERT_SETTING';
export const CHANGE_ALERT_SETTING_PENDING = 'CHANGE_ALERT_SETTING_PENDING';
export const CHANGE_ALERT_SETTING_FULFILLED = 'CHANGE_ALERT_SETTING_FULFILLED';
export const CHANGE_ALERT_SETTING_REJECTED = 'CHANGE_ALERT_SETTING_REJECTED'

export function fetchAlertSetting(user_id) {
  return {
    type: FETCH_ALERT_SETTING,
    payload: bindApiKey(getAlertSetting,user_id)
  };
}

export function changeAlertSetting(user_id, alert_time) {
  return {
    type: CHANGE_ALERT_SETTING,
    payload: bindApiKey(getAlertSetting,[user_id, alert_time])
  };
}
