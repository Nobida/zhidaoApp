import {
  SET_CUR_LESSON_QA_PROGRESS,
  CLEAR_LESSON
} from '../../actions/lesson';

const initialState = {
  progress:0
};

export default function lesson_qa_progress(state = initialState, action = {}) {

  switch (action.type) {
    case SET_CUR_LESSON_QA_PROGRESS:
      console.log('set cur lesson qa progress');
      console.log(action);
      return Object.assign({}, state, action.progress);
    case CLEAR_LESSON:
      console.log('clear lesson');
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}