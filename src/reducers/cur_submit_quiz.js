import {
  SUBMIT_QUIZ_ANSWER_FULFILLED,
  SUBMIT_QUIZ_ANSWER_PENDING,
  SUBMIT_QUIZ_ANSWER_REJECTED,
  SUBMIT_QUIZ_ANSWER_MOCK,
  CLEAR_SUBMIT_QUIZ,
} from '../actions/quizset';

const initialState = {
  submitting_quiz: false,
  error_info: null,
  success_info: null
};
export default function cur_submit_quiz(state = initialState, action = {}) {
  switch (action.type) {

    case SUBMIT_QUIZ_ANSWER_PENDING:
      console.log('submitting quiz');
      return Object.assign({}, state, {submitting_quiz: true});

    case SUBMIT_QUIZ_ANSWER_FULFILLED:
      console.log('submit quiz succcess');
      console.log(action);

      return Object.assign({}, state, {
        submitting_quiz: false,
        success_info: action.payload
      });

    case SUBMIT_QUIZ_ANSWER_REJECTED:
      console.log('submit quiz failed');
      return Object.assign({}, state, {
        submitting_quiz: false,
        error_info: true
      });

    case SUBMIT_QUIZ_ANSWER_MOCK:
      return Object.assign({}, state, {
        submitting_quiz: false,
        success_info: true
      });

    case CLEAR_SUBMIT_QUIZ:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
}