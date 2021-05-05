import {
  FETCH_LESSON_QA_PENDING,
  FETCH_LESSON_QA_FULFILLED,
  FETCH_LESSON_QA_REJECTED,
  CLEAR_LESSON
} from '../../actions/lesson';

const initialState = {
    fetching_lesson_qa: false,
    qa: null,
};

export default function lesson_qa(state = initialState, action = {}) {

  switch (action.type) {

    case FETCH_LESSON_QA_PENDING:
       console.log('fetching  lesson qa');
      console.log(action);
      return Object.assign({}, state, {fetching_lesson_qa:true});
    case FETCH_LESSON_QA_FULFILLED:
      console.log('fetch lesson qa success');
      console.log(action);
      return Object.assign({}, state, {qa:action.payload,fetching_lesson_qa:false});
    case CLEAR_LESSON:
      console.log('clear lesson');
      return Object.assign({}, state, initialState);
    default:
      return state;

  }
}