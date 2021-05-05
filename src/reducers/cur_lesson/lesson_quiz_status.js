import {
  FETCH_LESSON_QUIZ_STATUS_PENDING,
  FETCH_LESSON_QUIZ_STATUS_FULFILLED,
  CLEAR_LESSON
} from '../../actions/lesson';

const initialState = {
    fetching_lesson_quiz_status: false,
    lesson_quiz_status: null,
};

export default function lesson_quiz_status(state = initialState, action = {}) {

  switch (action.type) {

    case FETCH_LESSON_QUIZ_STATUS_PENDING:
       console.log('fetching  lesson qa');
      console.log(action);
      return Object.assign({}, state, {fetching_lesson_quiz_status:true});
    case FETCH_LESSON_QUIZ_STATUS_FULFILLED:
      console.log('fetch lesson qa success');
      console.log(action);
      return Object.assign({}, state, {lesson_quiz_status:action.payload,fetching_lesson_quiz_status:false});
    case CLEAR_LESSON:
      console.log('clear lesson');
      return Object.assign({}, state, initialState);
    default:
      return state;

  }
}