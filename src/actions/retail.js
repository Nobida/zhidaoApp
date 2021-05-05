import { getCreditStatus, getCreditItemList, getCreditPayRecord } from "../api/retail";
import bindApiKey from '../utils/bindApiKey';


export const FETCH_CREDIT_STATUS = 'FETCH_CREDIT_STATUS';
export const FETCH_CREDIT_STATUS_PENDING = 'FETCH_CREDIT_STATUS_PENDING';
export const FETCH_CREDIT_STATUS_FULFILLED = 'FETCH_CREDIT_STATUS_FULFILLED';
export const FETCH_CREDIT_STATUS_REJECTED = 'FETCH_CREDIT_STATUS_REJECTED';

export function fetchCreditStatus() {
  return {
    type: FETCH_CREDIT_STATUS,
    payload: bindApiKey(getCreditStatus)
  };
}


export const FETCH_RETAIL_ORDER_ITEM = 'FETCH_RETAIL_ORDER_ITEM';
export const FETCH_RETAIL_ORDER_ITEM_PENDING = 'FETCH_RETAIL_ORDER_ITEM_PENDING';
export const FETCH_RETAIL_ORDER_ITEM_FULFILLED = 'FETCH_RETAIL_ORDER_ITEM_FULFILLED';
export const FETCH_RETAIL_ORDER_ITEM_REJECTED = 'FETCH_RETAIL_ORDER_ITEM_REJECTED';


export function fetchRetailOrderItem() {
  return {
    type: FETCH_RETAIL_ORDER_ITEM,
    payload: bindApiKey(getCreditItemList)
  };
}

export const FETCH_CREDIT_PAY_RECORD = 'FETCH_CREDIT_PAY_RECORD';
export const FETCH_CREDIT_PAY_RECORD_PENDING = 'FETCH_CREDIT_PAY_RECORD_PENDING';
export const FETCH_CREDIT_PAY_RECORD_FULFILLED = 'FETCH_CREDIT_PAY_RECORD_FULFILLED';
export const FETCH_CREDIT_PAY_RECORD_REJECTED = 'FETCH_CREDIT_PAY_RECORD_REJECTED';


export function fetchCreditPayRecord() {
  return {
    type: FETCH_CREDIT_PAY_RECORD,
    payload: bindApiKey(getCreditPayRecord)
  };
}



