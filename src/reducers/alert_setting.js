import {
  FETCH_ALERT_SETTING_FULFILLED,
  FETCH_ALERT_SETTING_PENDING,
  FETCH_ALERT_SETTING_REJECTED
} from '../actions/alert_setting';

const initialState = {
  fetching_alert_setting:false,
  alert_setting:{}
};
export default function alert_setting(state = initialState, action = {}) {
  switch (action.type) {

    case FETCH_ALERT_SETTING_PENDING:
      console.log('fetching alert setting');
      return Object.assign({}, state, {fetching_alert_setting: true});

    case FETCH_ALERT_SETTING_FULFILLED:
      console.log('fetch alert setting success');
      console.log(action);
      return Object.assign({}, state, {alert_setting: action.payload, fetching_alert_setting: false});

    default:
      return state;
  }
}
