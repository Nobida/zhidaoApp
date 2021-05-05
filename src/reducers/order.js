import {

  FETCH_ORDER_RECORD_PENDING,
  FETCH_ORDER_RECORD_FULFILLED,
  FETCH_ORDER_DETAIL_RECORD_PENDING,
  FETCH_ORDER_DETAIL_RECORD_FULFILLED,  

} from '../actions/order';

const initialState = {

  fetching_order_record: false,
  credit_order_record: [],
  items: [],
  fetching_order_detail_record: false,
  order_detail_record: [],


};
export default function order(state = initialState, action = {}) {
  switch (action.type) {
   
    case FETCH_ORDER_RECORD_PENDING:
      console.log('fetching credit_order_record');
      console.log(action);
      return Object.assign({}, state, {
        fetching_order_record: true,
      });   

    case FETCH_ORDER_RECORD_FULFILLED:
      console.log('fetching credit_order_record success');
      console.log(action);
      return Object.assign({}, state, {
        fetching_pay_record: true,
        credit_order_record: action.payload,
        items: action.payload.items
      });

    case FETCH_ORDER_DETAIL_RECORD_PENDING:
      console.log('fetching order_detail_record');
      console.log(action);
      return Object.assign({}, state, {
        fetching_order_detail_record: true,
      });

    case FETCH_ORDER_DETAIL_RECORD_FULFILLED:
      console.log('fetching order_detail_record success');
      console.log(action.payload);
      return Object.assign({}, state, {
        fetching_order_detail_record: true,
        order_detail_record: action.payload,
      });

    default:
      return state;
  }
}