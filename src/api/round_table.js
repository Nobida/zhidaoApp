import { BASIC_URL } from './const';

export function getRoundTableListByCourse(course,apikey){
  const GET_ROUND_TABLE_URL = BASIC_URL+"/round_table/?course="+course+"&apikey="+apikey;

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: GET_ROUND_TABLE_URL,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get round table success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get round table failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise
}

export function getRoundTableList(apikey){
  const GET_ROUND_TABLE_URL = BASIC_URL+"/round_table/?apikey="+apikey;

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: GET_ROUND_TABLE_URL,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get round table success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get round table failed!');
        console.log(error);
        reject(error);
      }
    });
  });
  return promise
}

export function getRoundTableListByBook(book,apikey){
  const GET_ROUND_TABLE_URL = BASIC_URL+"/round_table/?book="+book+"&apikey="+apikey;

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: GET_ROUND_TABLE_URL,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get round table success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get round table failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise
}

export function getNoteByRoundTable(roundTable, url, apikey){
  const GET_ROUND_TABLE_NOTE_URL = url ? url :
        BASIC_URL+"/note/?round_table="+roundTable+"&apikey="+apikey+'&public=true';

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: GET_ROUND_TABLE_NOTE_URL,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get round table note success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get round table note failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise
}

export function getQuestionByRoundTable(roundTable, url, apikey){
  const GET_ROUND_TABLE_QUESTION_URL = url ? url :
        BASIC_URL+"/question/?round_table="+roundTable+"&apikey="+apikey;

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: GET_ROUND_TABLE_QUESTION_URL,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get round table question success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get round table question failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise
}

export function getPostByRoundTable(roundTable, url, apikey){
  const GET_ROUND_TABLE_POST_URL = url ? url :
        BASIC_URL+"/post/?round_table="+roundTable+"&apikey="+apikey;

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: GET_ROUND_TABLE_POST_URL,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get round table post success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get round table post failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise
}

export function getMediaByRoundTable(roundTable, url, apikey){
  const GET_ROUND_TABLE_MEDIA_URL = url ? url :
        BASIC_URL+"/media/?round_table="+roundTable+"&apikey="+apikey;

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: GET_ROUND_TABLE_MEDIA_URL,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get round table media success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get round table media failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise
}
