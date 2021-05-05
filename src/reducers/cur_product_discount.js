import {
  CHECK_DISCOUNT_FULFILLED,
  CHECK_DISCOUNT_PENDING,
  CHECK_DISCOUNT_REJECTED
} from '../actions/product_order';

const initialState = {
  fetching_discount:false,
  discount_info:{},
};
export default function product_discount(state = initialState, action = {}) {
  switch (action.type) {

    case CHECK_DISCOUNT_PENDING:
        console.log('fetching discount detail');
        return Object.assign({}, state, {fetching_discount: true, discount_info:{}});

    case CHECK_DISCOUNT_FULFILLED:
        console.log('fetch discount success');
        console.log(action);
        return Object.assign({}, state, {discount_info: action.payload,fetching_discount:false});

    default:
      return state;
  }
}
