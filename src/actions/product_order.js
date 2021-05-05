import { collectCart, getCreatedOrders, getCreatedOrder, modifyOrderMsg, getOrders, buyItem, deleteOrder, confirmOrder, buyImmediately, checkDiscount, createProductsOrder} from "../api/product_order";
import bindApiKey from '../utils/bindApiKey';
export const COLLECT_ORDER = 'COLLECT_ORDER';
export const COLLECT_ORDER_PENDING = 'COLLECT_ORDER_PENDING';
export const COLLECT_ORDER_FULFILLED = 'COLLECT_ORDER_FULFILLED';
export const COLLECT_ORDER_REJECTED = 'COLLECT_ORDER_REJECTED';

export function colletOrder() {
  return {
    type: COLLECT_ORDER,
    payload: bindApiKey(collectCart,[true])
  };
}

export const BUY_ITEM = 'BUY_ITEM';
export const BUY_ITEM_PENDING = 'BUY_ITEM_PENDING';
export const BUY_ITEM_FULFILLED = 'BUY_ITEM_FULFILLED';
export const BUY_ITEM_REJECTED = 'BUY_ITEM_REJECTED';

export function purchaseById(data) {
    return {
      type: BUY_ITEM,
      payload: bindApiKey(buyItem, data)
    };

}

export function purchaseImmediately(product_id){
  return {
    type: BUY_ITEM,
    payload: bindApiKey(buyImmediately, product_id)
  }
}

export const CHECK_DISCOUNT  = 'CHECK_DISCOUNT'
export const CHECK_DISCOUNT_PENDING = 'CHECK_DISCOUNT_PENDING'
export const CHECK_DISCOUNT_FULFILLED = 'CHECK_DISCOUNT_FULFILLED'
export const CHECK_DISCOUNT_REJECTED = 'CHECK_DISCOUNT_REJECTED'

export function checkDiscountByProduct(product_id){
  return {
    type: CHECK_DISCOUNT,
    payload: bindApiKey(checkDiscount, product_id)
  }
}

export const GET_CREATED_ORDERLIST = 'GET_CREATED_ORDERLIST';
export const GET_CREATED_ORDERLIST_PENDING = 'GET_CREATED_ORDERLIST_PENDING';
export const GET_CREATED_ORDERLIST_FULFILLED = 'GET_CREATED_ORDERLIST_FULFILLED';
export const GET_CREATED_ORDERLIST_REJECTED = 'GET_CREATED_ORDERLIST_REJECTED';

export function getCreatedOrderList() {
  return {
    type: GET_CREATED_ORDERLIST,
    payload: bindApiKey(getCreatedOrders)
  };
}

export const GET_ORDERLIST = 'GET_ORDERLIST';
export const GET_ORDERLIST_PENDING = 'GET_ORDERLIST_PENDING';
export const GET_ORDERLIST_FULFILLED = 'GET_ORDERLIST_FULFILLED';
export const GET_ORDERLIST_REJECTED = 'GET_ORDERLIST_REJECTED';

export function getOrderList(data) {
  return {
    type: GET_ORDERLIST,
    payload: bindApiKey(getOrders, data)
  };
}

export const GET_CREATED_ORDER = 'GET_CREATED_ORDER';
export const GET_CREATED_ORDER_PENDING = 'GET_CREATED_ORDER_PENDING';
export const GET_CREATED_ORDER_FULFILLED = 'GET_CREATED_ORDER_FULFILLED';
export const GET_CREATED_ORDER_REJECTED = 'GET_CREATED_ORDER_REJECTED';

export function getCreatedOrderById(data) {
  return {
    type: GET_CREATED_ORDER,
    payload: bindApiKey(getCreatedOrder, data)
  };
}

export const MODIFY_ORDER_MESSAGE = 'MODIFY_ORDER_MESSAGE';
export const MODIFY_ORDER_MESSAGE_PENDING = 'MODIFY_ORDER_MESSAGE_PENDING';
export const MODIFY_ORDER_MESSAGE_FULFILLED = 'MODIFY_ORDER_MESSAGE_FULFILLED';
export const MODIFY_ORDER_MESSAGE_REJECTED = 'MODIFY_ORDER_MESSAGE_REJECTED';

export function modifyOrderMessage(data) {
  return {
    type: MODIFY_ORDER_MESSAGE,
    payload: bindApiKey(modifyOrderMsg, data)
  };
}

export const DELETE_ORDER = 'DELETE_ORDER';
export const DELETE_ORDER_PENDING = 'DELETE_ORDER_PENDING';
export const DELETE_ORDER_FULFILLED = 'DELETE_ORDER_FULFILLED';
export const DELETE_ORDER_REJECTED = 'DELETE_ORDER_REJECTED';

export function deleteAnOrder(data) {
  return {
    type: DELETE_ORDER,
    payload: bindApiKey(deleteOrder,data),
  };
}

export const CONFIRM_ORDER = 'CONFIRM_ORDER';
export const CONFIRM_ORDER_PENDING = 'CONFIRM_ORDER_PENDING';
export const CONFIRM_ORDER_FULFILLED = 'CONFIRM_ORDER_FULFILLED';
export const CONFIRM_ORDER_REJECTED = 'CONFIRM_ORDER_REJECTED';

export function confirmOrderReceived(data) {
  return {
    type: CONFIRM_ORDER,
    payload: bindApiKey(confirmOrder,data),
  };
}

export function buyProducts(products){
  return {
    type: COLLECT_ORDER,
    payload: bindApiKey(createProductsOrder,[products])
  }
}
