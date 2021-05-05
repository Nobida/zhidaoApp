import {
  SET_CUR_LESSON_QUESTION_PROGRESS,
  CLEAR_LESSON
} from '../../actions/lesson';

const initialState = {
  common: 0,
  thinking: 0,
  mine: 0
};

export default function lesson_question_progress(state = initialState, action = {}) {

  switch (action.type) {
    case SET_CUR_LESSON_QUESTION_PROGRESS:
      console.log('set cur lesson question progress');
      console.log(action);
      return Object.assign({}, state, action.progress);
    case CLEAR_LESSON:
      console.log('clear lesson');
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}