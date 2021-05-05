import {
  SET_CUR_SCHEDULE,
  CLEAR_CUR_SCHEDULE,
} from '../actions/schedule';

const initialState = {};
export default function cur_schedule(state = initialState, action = {}) {
  switch (action.type) {

    case SET_CUR_SCHEDULE:
      console.log('set cur schedule:');
      console.log(action.schedule);
      return Object.assign({}, state, action.schedule);

    case CLEAR_CUR_SCHEDULE:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
}