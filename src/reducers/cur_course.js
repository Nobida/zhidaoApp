import {
  SET_COURSE_TO_STORE,
  FETCH_COURSE_BY_ID_PENDING,
  FETCH_COURSE_BY_ID_FULFILLED,
  FETCH_COURSE_BY_ID_REJECTED,
  FETCH_COURSE_RANK_LIST_PENDING,
  FETCH_COURSE_RANK_LIST_FULFILLED,
  FETCH_COURSE_PRODUCTS_FULFILLED,
  FETCH_COURSE_PRODUCTS_PENDING,
  FETCH_COURSE_PRODUCTS_REJECTED,
  FETCH_LATEST_COURSE_PENDING,
  FETCH_LATEST_COURSE_FULFILLED,
  FETCH_LATEST_COURSE_REJECTED
} from '../actions/course';

const initialState = {
  fetching_course: false,
  need_update: false,
  course: {},
  fetching_course_rank_list: false,
  course_rank_list: [],
  fetching_course_products: false,
  course_products: [],
  fetching_latest_id: true,
  new_course_id: ''
};
export default function cur_course(state = initialState, action = {}) {
  switch (action.type) {

    case SET_COURSE_TO_STORE:
      console.log('set course to store');
      console.log(action.payload);
      return Object.assign({}, state, {
        course: action.payload,
        fetching_course_rank_list: false,
        course_rank_list: []
      });

    case FETCH_COURSE_BY_ID_PENDING:
      console.log('fetching course by id');
      return Object.assign({}, state, {
        fetching_course: true,
        fetching_course_rank_list: false,
        course_rank_list: [] });

    case FETCH_COURSE_BY_ID_FULFILLED:
      console.log('fetch course by id success');
      return Object.assign({}, state, {
        fetching_course: false,
        need_update: false,
        course: action.payload,

      });

    case FETCH_COURSE_RANK_LIST_PENDING:
      console.log('fetching course list');
      return Object.assign({}, state, {
        fetching_course_rank_list: true
      });
    case FETCH_COURSE_RANK_LIST_FULFILLED:
      console.log('fetch course rank list success');
      console.log(action);
      return Object.assign({}, state, {
        fetching_course_rank_list: false,
        course_rank_list: action.payload.result
      });
    case FETCH_COURSE_PRODUCTS_PENDING:
       console.log('fetching course products');
      return Object.assign({}, state, {
        fetching_course_products: true
      });
    case FETCH_COURSE_PRODUCTS_FULFILLED:
      console.log('fetch course products success');
      console.log(action);
      return Object.assign({}, state, {
        fetching_course_products: false,
        course_products: action.payload.shelf
      });
    case FETCH_COURSE_PRODUCTS_REJECTED:
      return Object.assign({}, state, {
        fetching_course_products: false,
        course_products: []
      });
    case FETCH_LATEST_COURSE_PENDING:

      return Object.assign({}, state, {
        fetching_latest_id: true,
      });

    case FETCH_LATEST_COURSE_FULFILLED:
      console.log('fetch latest course success!!');
      console.log(action.payload.registerable_course);
      return Object.assign({}, state, {
        fetching_latest_id: true,
        new_course_id: action.payload.registerable_course
      });
    case FETCH_LATEST_COURSE_REJECTED:
      console.log('fetch latest course error');
      return Object.assign({}, state, {
        fetching_latest_id: false,
        new_course_id: action.payload.registerable_course
      });
    default:
      return state;
  }
}
