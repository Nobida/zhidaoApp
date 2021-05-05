import {
  FETCH_LESSON_TEXT_FULFILLED,
  FETCH_LESSON_TEXT_PENDING,
  CLEAR_LESSON
} from '../../actions/lesson';

const initialState = {
    fetching_lesson_text: false,
    text: null,
};

export default function lesson_text(state = initialState, action = {}) {

  switch (action.type) {

    case FETCH_LESSON_TEXT_PENDING:
       console.log('fetching  lesson text');
      console.log(action);
      return Object.assign({}, state, {fetching_lesson_text:true});
    case FETCH_LESSON_TEXT_FULFILLED:
      console.log('fetch lesson text success');
      console.log(action);
      return Object.assign({}, state, {text:action.payload,fetching_lesson_text:false});

    case CLEAR_LESSON:
      console.log('clear lesson');
      return Object.assign({}, state, initialState);
    default:
      return state;

  }
}