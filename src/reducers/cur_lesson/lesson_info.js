import {
  FETCH_LESSON_PENDING,
  FETCH_LESSON_FULFILLED,
  FETCH_LESSON_REJECTED,
  CLEAR_LESSON,
  SET_CUR_LESSON_INFO,
} from '../../actions/lesson';
const initialState = {
    fetching_lesson:false,
    lesson_info: {},
};

export default function lesson_info(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CUR_LESSON_INFO:
      console.log('SET_CUR_LESSON_INFO');
      console.log(action);
      return Object.assign({}, state, {
        fetching_lesson:false,
        lesson_info:action.lessonInfo
      });
    case FETCH_LESSON_PENDING:
      console.log('fetching  lesson');
      console.log(action);
      return Object.assign({}, state, {fetching_lesson:true});
    case FETCH_LESSON_FULFILLED:
      console.log('fetch lesson success');
      console.log(action);
      return Object.assign({}, state, {lesson_info:action.payload,fetching_lesson:false});
    case CLEAR_LESSON:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}
