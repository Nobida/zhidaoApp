import {
  SET_CUR_LESSON_NOTE_PROGRESS,
  CLEAR_LESSON
} from '../../actions/lesson';

const initialState = {
  common: 0,
  mine: 0
};

export default function lesson_note_progress(state = initialState, action = {}) {

  switch (action.type) {
    case SET_CUR_LESSON_NOTE_PROGRESS:
      console.log('set cur lesson note progress');
      console.log(action);
      return Object.assign({}, state, action.progress);
    case CLEAR_LESSON:
      console.log('clear lesson');
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}