import { getOrderRecord, getOrderDetailRecord } from "../api/order";
import bindApiKey from '../utils/bindApiKey';


export const FETCH_ORDER_RECORD = 'FETCH_ORDER_RECORD';
export const FETCH_ORDER_RECORD_PENDING = 'FETCH_ORDER_RECORD_PENDING';
export const FETCH_ORDER_RECORD_FULFILLED = 'FETCH_ORDER_RECORD_FULFILLED';
export const FETCH_ORDER_RECORD_REJECTED = 'FETCH_ORDER_RECORD_REJECTED';


export function fetchOrderRecord(orderID) {
  return {
    type: FETCH_ORDER_RECORD,
    payload: bindApiKey(getOrderRecord, [orderID])
  };
}

export const FETCH_ORDER_DETAIL_RECORD = 'FETCH_ORDER_DETAIL_RECORD';
export const FETCH_ORDER_DETAIL_RECORD_PENDING = 'FETCH_ORDER_DETAIL_RECORD_PENDING';
export const FETCH_ORDER_DETAIL_RECORD_FULFILLED = 'FETCH_ORDER_DETAIL_RECORD_FULFILLED';
export const FETCH_ORDER_DETAIL_RECORD_REJECTED = 'FETCH_ORDER_DETAIL_RECORD_REJECTED';


export function fetchOrderDetailRecord(orderID) {
  return {
    type: FETCH_ORDER_DETAIL_RECORD,
    payload: bindApiKey(getOrderDetailRecord, [orderID])
  };
}


