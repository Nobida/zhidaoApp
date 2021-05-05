import {
  COLLECT_ORDER_PENDING,
  COLLECT_ORDER_FULFILLED,
  COLLECT_ORDER_REJECTED,
  GET_CREATED_ORDERLIST_PENDING,
  GET_CREATED_ORDERLIST_FULFILLED,
  GET_CREATED_ORDERLIST_REJECTED,
  GET_CREATED_ORDER_PENDING,
  GET_CREATED_ORDER_FULFILLED,
  GET_CREATED_ORDER_REJECTED,
  MODIFY_ORDER_MESSAGE,
  MODIFY_ORDER_MESSAGE_PENDING,
  MODIFY_ORDER_MESSAGE_FULFILLED,
  MODIFY_ORDER_MESSAGE_REJECTED,
  GET_ORDERLIST_PENDING,
  GET_ORDERLIST_FULFILLED,
  GET_ORDERLIST_REJECTED,
  BUY_ITEM,
  BUY_ITEM_PENDING,
  BUY_ITEM_FULFILLED,
  BUY_ITEM_REJECTED,
  ELETE_ORDER,
  DELETE_ORDER_PENDING,
  DELETE_ORDER_FULFILLED,
  DELETE_ORDER_REJECTED
} from '../actions/product_order';

const initialState = {
  collecting_products:false,
  getting_created_orderlist: false,
  getting_orderlist: false,
  modifying_order_msg: false,
  deleting_order: false,
  delete_success: false,
  collect_order_ret: {},
  created_orderlist: [],
  created_order:{},
  orderlist: [],
  item_order:{},
};
export default function collectOrder(state = initialState, action = {}) {
  switch (action.type) {

    case COLLECT_ORDER_PENDING:
        console.log('collecting products');
        return Object.assign({}, state, {collect_order_ret:{}, collecting_products: true});

    case COLLECT_ORDER_FULFILLED:
        console.log('collect products success');
        console.log(action);
        return Object.assign({}, state, {collect_order_ret: action.payload,collecting_products:false});

    case BUY_ITEM_PENDING:
        console.log('buying item');
        return Object.assign({}, state, {item_order:{}});


    case BUY_ITEM_FULFILLED:
        console.log('buy item success');
        console.log(action);
        return Object.assign({}, state, {item_order: action.payload});

    case GET_CREATED_ORDERLIST_PENDING:
        console.log('fetching created order list');
        return Object.assign({}, state, {getting_created_orderlist: true});

    case GET_CREATED_ORDERLIST_FULFILLED:
        console.log('fetch created order list success');
        console.log(action);
        return Object.assign({}, state, {created_orderlist: action.payload,getting_created_orderlist:false});

    case GET_CREATED_ORDER_PENDING:
        console.log('fetching created order');
        return Object.assign({}, state, {});

    case GET_CREATED_ORDER_FULFILLED:
        console.log('fetch created order success');
        console.log(action);
        return Object.assign({}, state, {created_order: action.payload});

    case MODIFY_ORDER_MESSAGE_PENDING:
        console.log('modifyint order message');
        return Object.assign({}, state, {modifying_order_msg: true});

    case MODIFY_ORDER_MESSAGE_FULFILLED:
        console.log('modify order message success');
        return Object.assign({}, state, {modifying_order_msg: false});


    case GET_ORDERLIST_PENDING:
        console.log('fetching order list');
        return Object.assign({}, state, {getting_orderlist: true});

    case GET_ORDERLIST_FULFILLED:
        console.log('fetch order list success');
        console.log(action);
        return Object.assign({}, state, {orderlist: action.payload.reverse(),getting_orderlist:false});

    case DELETE_ORDER_PENDING:
        console.log('deleting order');
        return Object.assign({}, state, { deleting_order:true, delete_success: false});

    case DELETE_ORDER_FULFILLED:
        console.log('delete order success');
        console.log(action);
        return Object.assign({}, state, {delete_success: true, deleting_order: false});

    case DELETE_ORDER_REJECTED:
        console.log('delete order rejected');
        console.log(action);
        return Object.assign({}, state, {delete_success: false, deleting_order: false});
    default:
      return state;
  }
}
