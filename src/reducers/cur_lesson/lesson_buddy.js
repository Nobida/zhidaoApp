import {
  FETCH_LESSON_BUDDY_PENDING,
  FETCH_LESSON_BUDDY_FULFILLED,
  FETCH_LESSON_BUDDY_REJECTED,
  CLEAR_LESSON
} from '../../actions/lesson';

const initialState = {
  fetching_lesson_buddy: false,
  buddy: []
};

export default function lesson_buddy(state = initialState, action = {}) {

  switch (action.type) {

    case FETCH_LESSON_BUDDY_PENDING:
       console.log('fetching  lesson buddy');
      console.log(action);
      return Object.assign({}, state, {fetching_lesson_buddy:true});

    case FETCH_LESSON_BUDDY_FULFILLED:
      console.log('fetch lesson buddy success');
      console.log(action);
      return Object.assign({}, state, {buddy:action.payload,fetching_lesson_buddy:false});

    case CLEAR_LESSON:
      console.log('clear lesson');
      return Object.assign({}, state, initialState);
    default:
      return state;

  }
}