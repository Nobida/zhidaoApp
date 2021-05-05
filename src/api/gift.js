/**
 * course.js
 *
 * Course related api requests
 *
 */

import {BASIC_URL} from './const';

export function deleteGiftPromise(gift_id,apikey){
  const DELETE_GIFT_URL = BASIC_URL+'gift/'+gift_id+'/?apikey='+apikey;
  console.log(DELETE_GIFT_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "DELETE",
      url: DELETE_GIFT_URL,
      timeout: 5000,
      success: function(responseData){
        console.log('delete gift success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('delete gift failed!');
        reject(error.message);
      }
    });
  });
  return promise;
}
export function postGift(data,apikey){
  const POST_GIFT_URL = BASIC_URL+'gift/?apikey='+apikey;
  console.log(POST_GIFT_URL);
  console.log(data);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: POST_GIFT_URL,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('post gift success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('post gift failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function obtainGift(gift_id,apikey){
  const GIFT_URL = BASIC_URL+'receive_gift/'+gift_id+'/?apikey='+apikey;
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: GIFT_URL,
      timeout: 5000,
      success: function(responseData){
        console.log('receive gift success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('receive gift failed!');
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getGift(gift_id,apikey){
  const GIFT_URL = BASIC_URL+'gift/'+gift_id+'/?apikey='+apikey;
  console.log(GIFT_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: GIFT_URL,
      timeout: 5000,
      success: function(responseData){
        console.log('get gift success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get gift failed!');
        reject(error.message);
      }
    });
  });
  return promise;
}
export function getGiftList(apikey){
  const GET_GIFT_URL = BASIC_URL + 'gift/?apikey='+apikey;
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: GET_GIFT_URL,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get gift list success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get gift list failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}
export function getProductsCanBeUsedAsGift(apikey){
  const GET_PRODUCT_URL = BASIC_URL + 'product?type=course&can_be_used_as_gift=true&apikey='+apikey;
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: GET_PRODUCT_URL,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get product list success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get product list failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}