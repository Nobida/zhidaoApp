import {
  FETCH_LESSONS_PENDING,
  FETCH_LESSONS_FULFILLED,
  FETCH_LESSONS_REJECTED,
} from '../actions/lesson';

const initialState = {
  fetching_lessons:false,
  course:null,
  lessons:[]
};
export default function lessons(state = initialState, action = {}) {
  switch (action.type) {

    case FETCH_LESSONS_PENDING:
      console.log('fetching lessons');
      return Object.assign({}, state, {fetching_lessons:true,lessons:[]});

    case FETCH_LESSONS_FULFILLED:
      console.log('fetch lessons success');
      console.log(action);
      return Object.assign({}, state, {lessons: action.payload, fetching_lessons: false, course: action.meta.courseId});

    default:
      return state;
  }
}
