import {

  FETCH_CREDIT_STATUS_FULFILLED,
  FETCH_CREDIT_STATUS_REJECTED,
  FETCH_CREDIT_STATUS_PENDING,
  FETCH_RETAIL_ORDER_ITEM_PENDING,
  FETCH_RETAIL_ORDER_ITEM_FULFILLED,
  FETCH_RETAIL_ORDER_ITEM_REJECTED,
  FETCH_CREDIT_PAY_RECORD_PENDING,
  FETCH_CREDIT_PAY_RECORD_FULFILLED,
  FETCH_CREDIT_ORDER_RECORD_PENDING,
  FETCH_CREDIT_ORDER_RECORD_FULFILLED,  

} from '../actions/retail';

const initialState = {
  fetching_credit_score: false,
  personal_credit_info:[],
  fetching_order_item: false,
  order_item_list: [],
  fetching_credit_pay_record: false,
  credit_pay_record: [],

};
export default function retail(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_CREDIT_STATUS_PENDING:
      console.log("fetching_credit_score pending")
      return Object.assign({}, state, {fetching_credit_score: true});
    case FETCH_CREDIT_STATUS_FULFILLED:
      console.log("fetching_credit_score fulfilled")
      return Object.assign({}, state,
        {
          fetching_credit_score: true,
          personal_credit_info: action.payload
        });
    case FETCH_RETAIL_ORDER_ITEM_PENDING:
      console.log('fetching retail orderItem');
      return Object.assign({}, state, {
        fetching_order_item: true
      });
    case FETCH_RETAIL_ORDER_ITEM_FULFILLED:
      console.log('fetching retail orderItem success');
      console.log(action);
      return Object.assign({}, state, {
        fetching_order_item: true,
        order_item_list: action.payload.results
      });

    case FETCH_CREDIT_PAY_RECORD_PENDING:
      console.log('fetching credit_pay_record');
      console.log(action);
      return Object.assign({}, state, {
        fetching_credit_pay_record: true,
      });   

    case FETCH_CREDIT_PAY_RECORD_FULFILLED:
      console.log('fetching credit_pay_record success');
      console.log(action);
      return Object.assign({}, state, {
        fetching_credit_pay_record: true,
        credit_pay_record: action.payload.results
      });    
    default:
      return state;
  }
}
