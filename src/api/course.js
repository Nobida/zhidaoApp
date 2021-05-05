/**
 * course.js
 *
 * Course related api requests
 *
 */

import {BASIC_URL, ROOT_URL} from './const';

export function getCourseList(studentID, status, apikey) {

  console.log("getApikey")
  console.log(apikey)

  const GET_COURSE_LIST_URL = BASIC_URL + "course/?apikey="+apikey+'&status='+status+'&student='+studentID;
  console.log(GET_COURSE_LIST_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_COURSE_LIST_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get course list success');
        console.log(responseData);
        if (responseData instanceof Array){
          responseData = responseData.filter(function(d){return d.enrolled||d.registerable})
        }
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get course list failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });

  return promise;
}


export function getCourse(courseID, apikey) {
  const GET_COURSE_URL = BASIC_URL+"course/"+courseID+"?apikey="+apikey;
  console.log(GET_COURSE_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_COURSE_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get course success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get course failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getCourseRankList(courseId,length,type,apikey){
  const GET_COURSE_RANK_LIST_URL = BASIC_URL+"rank_list/?apikey="+apikey+"&course="+courseId+"&type="+type+"&length="+length;
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_COURSE_RANK_LIST_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get rank list success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get rank list failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}


export function getCourseProducts(courseId,apikey){
  const FETCH_COURSE_PRODUCT_URL = BASIC_URL + "course_products/"+courseId+"?apikey="+apikey;
  console.log(FETCH_COURSE_PRODUCT_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: FETCH_COURSE_PRODUCT_URL,
      dataType: "json",
      timeout: 7000,
      success: function(responseData){
        console.log('fetch course products success');
        console.log(responseData);
        if(responseData && responseData.shelf)
          resolve(responseData);
        else{
          reject('not found')
        }
      },
      error: function(error){
        console.log('fetch course products failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getLatestCourse(courseId,apikey){
  const FETCH_LATEST_COURSE_URL = ROOT_URL + "api/v2/registerable_course/"+courseId+"/?apikey="+apikey;
  console.log(FETCH_LATEST_COURSE_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: FETCH_LATEST_COURSE_URL,
      dataType: "json",
      timeout: 7000,
      success: function(responseData){
        console.log('fetch latest course success');
        console.log(responseData.registerable_course!=null);
        if(responseData && responseData.registerable_course)
          resolve(responseData);
        else{
          reject('not found')
        }
      },
      error: function(error){
        console.log('fetch latest course failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}
