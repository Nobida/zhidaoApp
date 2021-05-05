import {
  FETCH_LESSON_LECTURE_FULFILLED,
  FETCH_LESSON_LECTURE_PENDING,
  CLEAR_LESSON
} from '../../actions/lesson';

const initialState = {
    fetching_lesson_lecture: false,
    lecture: null,
};

export default function lesson_lecture(state = initialState, action = {}) {

  switch (action.type) {

    case FETCH_LESSON_LECTURE_PENDING:
      console.log('fetching  lesson lecture');
      console.log(action);
      return Object.assign({}, state, {fetching_lesson_lecture:true});
    case FETCH_LESSON_LECTURE_FULFILLED:
      console.log('fetch lesson lecture success');
      console.log(action);
      return Object.assign({}, state, {lecture:action.payload,fetching_lesson_lecture:false});

    case CLEAR_LESSON:
      console.log('clear lesson');
      return Object.assign({}, state, initialState);
    default:
      return state;

  }
}