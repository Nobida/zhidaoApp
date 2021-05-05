/**
 * user.js
 *
 * User related api requests
 *
 */

import {BASIC_URL} from './const';

export function getUserStat(api_key){
  const GET_USER_STAT_URL = BASIC_URL + "user_stat/?apikey=" + api_key;
  console.log(GET_USER_STAT_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_USER_STAT_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get user stat success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get user stat failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}
