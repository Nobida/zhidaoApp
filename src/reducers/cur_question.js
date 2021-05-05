import {
  SET_QUESTION_TO_STORE,
  FETCH_QUESTION_BY_ID_PENDING,
  FETCH_QUESTION_BY_ID_FULFILLED,
  FETCH_QUESTION_BY_ID_REJECTED,
  TOGGLE_FAVOR_OF_QUESTION_PENDING,
  TOGGLE_FAVOR_OF_QUESTION_FULFILLED,
  TOGGLE_FAVOR_OF_QUESTION_REJECTED
} from '../actions/question';

const initialState = {
  fetching_question: false,
  need_update: false,
  question: {}
};
export default function cur_question(state = initialState, action = {}) {
  switch (action.type) {

    case SET_QUESTION_TO_STORE:
      return Object.assign({}, state, {
        question: action.payload
      });

    case FETCH_QUESTION_BY_ID_PENDING:
      console.log('fetching question by id');
      return Object.assign({}, state, { fetching_question: true });

    case FETCH_QUESTION_BY_ID_FULFILLED:
      console.log('fetch question by id success');
      return Object.assign({}, state, {
        fetching_question: false,
        need_update: false,
        question: action.payload
      });

    case TOGGLE_FAVOR_OF_QUESTION_PENDING:
      console.log('toggling favor of question');
      return state;

    case TOGGLE_FAVOR_OF_QUESTION_FULFILLED:
      console.log('toggle favor of question success');
      console.log(action);
      if ("no_action" == action.payload.results || state.question.uuid != action.meta.questionID) {
        console.log('no action');
        return state;
      }
      console.log('toggle favor in cur_question');
      console.log(action);
      const rated = ("added" == action.payload.result ? true : false);
      const question = Object.assign({}, state.question, { rated });
      return Object.assign({}, state, {
        question,
        need_update: true
      });

    default:
      return state;
  }
}
