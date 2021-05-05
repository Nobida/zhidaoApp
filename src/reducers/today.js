import {
  FETCH_TODAY_FULFILLED,
  FETCH_TODAY_PENDING,
  FETCH_TODAY_REJECTED
} from '../actions/today';

const initialState = {
  fetching_today:false,
  date: null,
  courses: null,
  course_state: null,
  lessons: null
};
export default function today(state = initialState, action = {}) {
  switch (action.type) {

    case FETCH_TODAY_PENDING:
      console.log('fetching today');
      return Object.assign({}, state, { fetching_today: true });

    case FETCH_TODAY_FULFILLED:
      console.log('fetch today success');
      console.log(action);
      const {
        date,
        courses,
        course_state,
        lessons,
      } = action.payload;
     // const course_state = 'NEW_COURSE';
      return Object.assign({}, state, {
        date,
        courses,
        course_state,
        lessons,
        fetching_today: false,
      });

    default:
      return state;
  }
}
