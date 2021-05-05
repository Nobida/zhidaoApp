/**
 * book.js
 *
 * Book related api requests
 *
 */

import {BASIC_URL} from './const';


export function getBookList(apikey) {
  const GET_BOOK_LIST_URL = BASIC_URL + "book/?apikey="+apikey;
  console.log(GET_BOOK_LIST_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_BOOK_LIST_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get book list success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get book list failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getBookDetail(book_uri,apikey) {
  const GET_BOOK_DETAIL_URL = BASIC_URL + "book_info/" + book_uri+"/?apikey="+apikey;
  console.log(GET_BOOK_DETAIL_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_BOOK_DETAIL_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get book detail success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get book detail failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}
