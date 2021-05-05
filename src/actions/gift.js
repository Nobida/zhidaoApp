//
// Gift
// --------------------------------------------------

import {getGiftList,postGift,deleteGiftPromise,getGift,obtainGift,getProductsCanBeUsedAsGift} from "../api/gift";
import bindApiKey from '../utils/bindApiKey';

export const FETCH_GIFT_LIST = 'FETCH_GIFT_LIST';
export const FETCH_GIFT_LIST_PENDING = 'FETCH_GIFT_LIST_PENDING';
export const FETCH_GIFT_LIST_FULFILLED = 'FETCH_GIFT_LIST_FULFILLED';
export const FETCH_GIFT_LIST_REJECTED = 'FETCH_GIFT_LIST_REJECTED';

export const CREATE_GIFT = 'CREATE_GIFT';
export const CREATE_GIFT_PENDING = 'CREATE_GIFT_PENDING';
export const CREATE_GIFT_FULFILLED = 'CREATE_GIFT_FULFILLED';
export const CREATE_GIFT_REJECTED = 'CREATE_GIFT_REJECTED';

export const DELETE_GIFT = 'DELETE_GIFT';
export const DELETE_GIFT_PENDING = 'DELETE_GIFT_PENDING';
export const DELETE_GIFT_FULFILLED = 'DELETE_GIFT_FULFILLED';
export const DELETE_GIFT_REJECTED = 'DELETE_GIFT_REJECTED';

export const FETCH_CUR_GIFT = 'FETCH_CUR_GIFT';
export const FETCH_CUR_GIFT_PENDING = 'FETCH_CUR_GIFT_PENDING';
export const FETCH_CUR_GIFT_FULFILLED = 'FETCH_CUR_GIFT_FULFILLED';
export const FETCH_CUR_GIFT_REJECTED = 'FETCH_CUR_GIFT_REJECTED';

export const RECEIVE_GIFT = 'RECEIVE_GIFT';
export const RECEIVE_GIFT_PENDING = 'RECEIVE_GIFT_PENDING';
export const RECEIVE_GIFT_FULFILLED = 'RECEIVE_GIFT_FULFILLED';
export const RECEIVE_GIFT_REJECTED = 'RECEIVE_GIFT_REJECTED';

export const FETCH_PRODUCTS_CAN_BE_USED_AS_GIFT = 'FETCH_PRODUCTS_CAN_BE_USED_AS_GIFT'
export const FETCH_PRODUCTS_CAN_BE_USED_AS_GIFT_PENDING = 'FETCH_PRODUCTS_CAN_BE_USED_AS_GIFT_PENDING'
export const FETCH_PRODUCTS_CAN_BE_USED_AS_GIFT_FULFILLED = 'FETCH_PRODUCTS_CAN_BE_USED_AS_GIFT_FULFILLED'
export const FETCH_PRODUCTS_CAN_BE_USED_AS_GIFT_REJECTED = 'FETCH_PRODUCTS_CAN_BE_USED_AS_GIFT_REJECTED'

export const SET_CUR_GIFT = 'SET_CUR_GIFT';

export function createGift(data){
  return {
    type: CREATE_GIFT ,
    payload: bindApiKey(postGift,data)
  }
}
export function fetchGiftList(){
  return {
    type: FETCH_GIFT_LIST ,
    payload: bindApiKey(getGiftList)
  }
}
export function deleteGift(giftId){
  return {
    type: DELETE_GIFT,
    payload: bindApiKey(deleteGiftPromise,giftId)
  }
}
export function fetchCurGift(giftId){
  return {
    type: FETCH_CUR_GIFT,
    payload: bindApiKey(getGift,giftId)
  }
}
export function setCurGift(data){
   return {
    type: SET_CUR_GIFT ,
    gift: data
  }
}
export function receiveGift(giftId){
   return {
    type: RECEIVE_GIFT,
    payload: bindApiKey(obtainGift,giftId)
  }
}

export function fetchProductsCanBeUsedAsGift(){
  return {
    type: FETCH_PRODUCTS_CAN_BE_USED_AS_GIFT,
    payload: bindApiKey(getProductsCanBeUsedAsGift)
  }
}