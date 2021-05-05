import {
  POST_NOTE_FULFILLED,
  POST_NOTE_PENDING,
  POST_NOTE_REJECTED,
  CLEAR_CUR_POST,
} from '../actions/note';
import {
  POST_QUESTION_FULFILLED,
  POST_QUESTION_PENDING,
  POST_QUESTION_REJECTED,
} from '../actions/question';
import {
  POST_POST_FULFILLED,
  POST_POST_PENDING,
  POST_POST_REJECTED,
} from '../actions/post';

const initialState = {
  posting:false,
  success_info:null,
  error_info:null
};
export default function cur_post(state = initialState, action = {}) {
  switch (action.type) {

    case POST_NOTE_PENDING:
    case POST_QUESTION_PENDING:
    case POST_POST_PENDING:
      console.log('posting item');
      return Object.assign({}, state, { posting: true });

    case POST_NOTE_FULFILLED:
    case POST_QUESTION_FULFILLED:
    case POST_POST_FULFILLED:
      console.log('post item success');
      console.log(action);
      return Object.assign({}, state, { success_info: action.payload, posting: false, error_info: null });

    case POST_NOTE_REJECTED:
    case POST_QUESTION_REJECTED:
    case POST_POST_REJECTED:
      console.log('post item failed');
      console.log(action);
      return Object.assign({}, state, { error_info: action.payload, posting: false, success_info: null });

    case CLEAR_CUR_POST:
      return initialState;

    default:
        return state;
  }
}
