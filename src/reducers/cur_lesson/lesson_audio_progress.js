                            import {
  SET_CUR_LESSON_AUDIO_PROGRESS,
  CLEAR_LESSON
} from '../../actions/lesson';

const initialState = {
};

export default function lesson_audio_progress(state = initialState, action = {}) {

  switch (action.type) {
    case SET_CUR_LESSON_AUDIO_PROGRESS:
      console.log('set cur lesson audio progress');
      console.log(action);
      return Object.assign({}, state, action.progress);
    case CLEAR_LESSON:
      console.log('clear lesson');
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}