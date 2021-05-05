//
// Coupon
// --------------------------------------------------

import {getCoupon} from "../api/coupon";
import bindApiKey from '../utils/bindApiKey';

export const FETCH_CUR_COUPON = 'FETCH_CUR_COUPON';
export const FETCH_CUR_COUPON_PENDING = 'FETCH_CUR_COUPON_PENDING';
export const FETCH_CUR_COUPON_FULFILLED = 'FETCH_CUR_COUPON_FULFILLED';
export const FETCH_CUR_COUPON_REJECTED = 'FETCH_CUR_COUPON_REJECTED';


export const SET_CUR_GIFT = 'SET_CUR_GIFT';

export function fetchCurCoupon(giftId){
  return {
    type: FETCH_CUR_COUPON,
    payload: bindApiKey(getCoupon,giftId)
  }
}