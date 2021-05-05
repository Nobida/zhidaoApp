
import {
  FETCH_CUR_COUPON_PENDING,
  FETCH_CUR_COUPON_FULFILLED,
  FETCH_CUR_COUPON_REJECTED
} from "../../actions/coupon";

const initialState = {
    fetching_coupon:false,
    cur_coupon: {},
    error_info: null
};

export default function cur_coupon(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_CUR_COUPON_PENDING:
      console.log('fetch coupon pending');
      console.log(action);
      return Object.assign({}, state, {fetching_coupon:true,cur_coupon:{},error_info:null});
    case FETCH_CUR_COUPON_FULFILLED:
      console.log('fetch coupon success');
      console.log(action);
      return Object.assign({}, state, {cur_coupon:action.payload,fetching_coupon:false});
    case FETCH_CUR_COUPON_REJECTED:
      console.log('fetch coupon fail');
      console.log(action);
      return Object.assign({}, state, {error_info:true,fetching_coupon:false});
    default:
      return state;
  }
}
