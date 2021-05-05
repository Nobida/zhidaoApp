//
// Course
// --------------------------------------------------

import { getCourseList, getCourse, getCourseRankList, getCourseProducts, getLatestCourse } from "../api/course";
import bindApiKey from '../utils/bindApiKey';


export const FETCH_COURSES = 'FETCH_COURSES';
export const FETCH_COURSES_PENDING = 'FETCH_COURSES_PENDING';
export const FETCH_COURSES_FULFILLED = 'FETCH_COURSES_FULFILLED';
export const FETCH_COURSES_REJECTED = 'FETCH_COURSES_REJECTED';

export function fetchCourseList(studentID, status) {

  return {
    type: FETCH_COURSES,
    meta: {status},
    payload: bindApiKey(getCourseList, [studentID, status])
  };
}

export const SET_COURSE_TO_STORE = 'SET_COURSE_TO_STORE';

export function setCourseToStore(course) {
  return {
    type: SET_COURSE_TO_STORE,
    payload: course
  };
}

export const FETCH_COURSE_BY_ID = 'FETCH_COURSE_BY_ID';
export const FETCH_COURSE_BY_ID_PENDING = 'FETCH_COURSE_BY_ID_PENDING';
export const FETCH_COURSE_BY_ID_FULFILLED = 'FETCH_COURSE_BY_ID_FULFILLED';
export const FETCH_COURSE_BY_ID_REJECTED = 'FETCH_COURSE_BY_ID_REJECTED';

export function fetchCourseByID(courseID) {
  return {
    type: FETCH_COURSE_BY_ID,
    payload: bindApiKey(getCourse, [courseID])
  };
}

export const FETCH_COURSE_RANK_LIST  = 'FETCH_COURSE_RANK_LIST';
export const FETCH_COURSE_RANK_LIST_PENDING  = 'FETCH_COURSE_RANK_LIST_PENDING';
export const FETCH_COURSE_RANK_LIST_FULFILLED  = 'FETCH_COURSE_RANK_LIST_FULFILLED'
export const FETCH_COURSE_RANK_LIST_REJECTED  = 'FETCH_COURSE_RANK_LIST_REJECTED';;

export function fetchCourseRankList(courseId,length,type){
   if(!length){
     length = 50;
     type = 'punch'
   }
   if(!type){
     type = 'punch'
   }
   return {
    type: FETCH_COURSE_RANK_LIST,
    payload: bindApiKey(getCourseRankList, [courseId,length,type])
  };
}

export const FETCH_COURSE_PRODUCTS  = 'FETCH_COURSE_PRODUCTS';
export const FETCH_COURSE_PRODUCTS_PENDING  = 'FETCH_COURSE_PRODUCTS_PENDING';
export const FETCH_COURSE_PRODUCTS_FULFILLED  = 'FETCH_COURSE_PRODUCTS_FULFILLED'
export const FETCH_COURSE_PRODUCTS_REJECTED  = 'FETCH_COURSE_PRODUCTS_REJECTED';;

export function fetchCourseProducts(courseID) {
  return {
    type: FETCH_COURSE_PRODUCTS,
    payload: bindApiKey(getCourseProducts, [courseID])
  };
}


export const FETCH_LATEST_COURSE  = 'FETCH_LATEST_COURSE';
export const FETCH_LATEST_COURSE_PENDING  = 'FETCH_LATEST_COURSE_PENDING';
export const FETCH_LATEST_COURSE_FULFILLED  = 'FETCH_LATEST_COURSE_FULFILLED'
export const FETCH_LATEST_COURSE_REJECTED  = 'FETCH_LATEST_COURSE_REJECTED';;

export function fetchLatestCourse(courseID) {
  return {
    type: FETCH_LATEST_COURSE,
    payload: bindApiKey(getLatestCourse, [courseID])
  }
}