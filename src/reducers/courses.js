import {
  FETCH_COURSES_PENDING,
  FETCH_COURSES_FULFILLED,
  FETCH_COURSES_REJECTED,
  FETCH_COURSES
} from '../actions/course';

const initialState = {

  ended_courses: [],
  fetching_ended_courses: false,
  going_courses: [],
  fetching_going_courses: false,
  waiting_courses: [],
  fetching_waiting_courses: false,
  registerable_courses: [],
  fetching_registerable_courses: false,
  fetch_courses: false,
  all_courses: [],


};

export default function courses(state = initialState, action = {}) {
  switch (action.type) {

    case FETCH_COURSES_PENDING:
      console.log('fetch course');
      console.log(action)
      switch(action.meta.status) {
        case 'ended':
          return Object.assign({}, state, {fetching_ended_courses: true});
        case 'going':
          return Object.assign({}, state, {fetching_going_courses: true});
        case 'waiting':
          return Object.assign({}, state, {fetching_waiting_courses: true});
        case 'registerable':
          return Object.assign({}, state, {fetching_registerable_courses: true});  
        case 'all':
          return Object.assign({}, state, {fetching_courses: true});      
      }


    case FETCH_COURSES_FULFILLED:
        console.log('fetch course success');
        switch(action.meta.status) {
          case 'ended':
            return Object.assign({}, state, {fetching_ended_courses: true, ended_courses: action.payload});
          case 'going':
            return Object.assign({}, state, {fetching_going_courses: true, going_courses: action.payload});
            
          case 'waiting':
            return Object.assign({}, state, {fetching_waiting_courses: true, waiting_courses: action.payload});
          case 'registerable':
            return Object.assign({}, state, {fetching_registerable_courses: true, registerable_courses: action.payload});
          case 'all':
            return Object.assign({}, state, {fetching_courses: true, all_courses: action.payload});       
        }

    case FETCH_COURSES_REJECTED:
        console.log('fetch failed')




    default:
        return state;
  }
}
