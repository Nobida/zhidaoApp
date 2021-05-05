/**
 * coupon.js
 *
 * Coupon related api requests
 *
 */

import {BASIC_URL} from './const';

export function getCoupon(coupon_id,apikey){
  const GET_COUPON_URL = BASIC_URL+'coupon/'+coupon_id+'/?apikey='+apikey;
  console.log(GET_COUPON_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: GET_COUPON_URL,
      timeout: 5000,
      success: function(responseData){
        console.log('get coupon success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get coupon failed!');
        reject(error.message);
      }
    });
  });
  return promise;
}


