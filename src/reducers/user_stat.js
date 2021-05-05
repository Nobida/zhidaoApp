import {
  FETCH_USER_STAT_PENDING,
  FETCH_USER_STAT_FULFILLED,
  FETCH_USER_STAT_REJECTED
} from '../actions/user';

const initialState = {
  fetching_user_stat:false,
  stat:{}
};
export default function user_stat(state = initialState, action = {}) {
  switch (action.type) {

    case FETCH_USER_STAT_PENDING:
      console.log('fetching user stat');
      return Object.assign({}, state, {fetching_user_stat: true});

    case FETCH_USER_STAT_FULFILLED:
      console.log('fetch user stat success');
      console.log(action);
      return Object.assign({}, state, {
        stat: action.payload,
        fetching_user_stat: false
      });

    default:
      return state;
  }
}
