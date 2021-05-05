/**
 ** today
 **/

import {BASIC_URL} from './const';

export function getToday(apikey) {
  const GET_GET_TODAY_URL = BASIC_URL + "today/?apikey=" + apikey;
  console.log(GET_GET_TODAY_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_GET_TODAY_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get today success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get today failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}
