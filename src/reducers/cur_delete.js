import {
    DELETE_NOTE_FULFILLED,
    DELETE_NOTE_PENDING,
    DELETE_NOTE_REJECTED
} from '../actions/note';
import {
  DELETE_QUESTION_FULFILLED,
  DELETE_QUESTION_PENDING,
  DELETE_QUESTION_REJECTED
} from '../actions/question';
import {
  DELETE_POST_FULFILLED,
  DELETE_POST_PENDING,
  DELETE_POST_REJECTED
} from '../actions/post';

const initialState = {
  deleting:false,
  success_info:null,
  error_info:null
};
export default function cur_delete(state = initialState, action = {}) {
  switch (action.type) {

    case DELETE_NOTE_PENDING:
    case DELETE_QUESTION_PENDING:
    case DELETE_POST_PENDING:
      console.log('deleting item');
      return Object.assign({}, state, { deleting: true });

    case DELETE_NOTE_FULFILLED:
    case DELETE_QUESTION_FULFILLED:
    case DELETE_POST_FULFILLED:
      console.log('delete item success');
      console.log(action);
      return Object.assign({}, state, { success_info: true, deleting: false, error_info: null});

    case DELETE_NOTE_REJECTED:
    case DELETE_QUESTION_REJECTED:
    case DELETE_POST_REJECTED:
      console.log('delete item failed');
      console.log(action);
      return Object.assign({}, state, { error_info: true, deleting: false, success_info: null });

    default:
        return state;
  }
}
