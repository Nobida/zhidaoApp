/**
 * alert_setting.js
 *
 * Book related api requests
 *
 */

import {BASIC_URL} from './const';


export function getAlertSetting(user_id, apikey) {
  const ALERT_SETTING_URL = BASIC_URL + "reader_setting/"+user_id+"/?apikey="+apikey;

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: ALERT_SETTING_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get alert setting success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get alert setting failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function setAlertSetting(user_id, alert_time,apikey) {
  const ALERT_SETTING_URL = BASIC_URL + "reader_setting/"+user_id+"/?apikey="+apikey;


  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'PUT',
      url: ALERT_SETTING_URL,
      dataType: "json",
      data:{
        user: user_id,
        alert_time: alert_time
      },
      timeout: 5000,
      success: function(responseData){
        console.log('get alert setting success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get alert setting failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

