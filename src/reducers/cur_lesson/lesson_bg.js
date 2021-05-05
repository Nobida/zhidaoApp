import {
  FETCH_LESSON_BG_PENDING,
  FETCH_LESSON_BG_FULFILLED,
  FETCH_LESSON_BG_REJECTED,
  CLEAR_LESSON
} from '../../actions/lesson';

const initialState = {
    fetching_lesson_bg: false,
    background: null,
};

export default function lesson_bg(state = initialState, action = {}) {

  switch (action.type) {

    case FETCH_LESSON_BG_PENDING:
       console.log('fetching  lesson background');
      console.log(action);
      return Object.assign({}, state, {fetching_lesson_bg:true});
    case FETCH_LESSON_BG_FULFILLED:
      console.log('fetch lesson background success');
      console.log(action);
      return Object.assign({}, state, {background:action.payload,fetching_lesson_bg:false});

    case CLEAR_LESSON:
      console.log('clear lesson');
      return Object.assign({}, state, initialState);
    default:
      return state;

  }
}