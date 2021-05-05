import {
  FETCH_PRODUCT_DETAIL_PENDING,
  FETCH_PRODUCT_DETAIL_FULFILLED,
  FETCH_PRODUCT_DETAIL_REJECTED,
} from '../actions/product';

const initialState = {
  fetching_product_item:false,
  cur_product:{},
};
export default function products(state = initialState, action = {}) {
  switch (action.type) {

    case FETCH_PRODUCT_DETAIL_PENDING:
        console.log('fetching product detail');
        return Object.assign({}, state, {fetching_product_item: true, cur_product:{}});

    case FETCH_PRODUCT_DETAIL_FULFILLED:
        console.log('fetch product detail success');
        console.log(action);
        return Object.assign({}, state, {cur_product: action.payload,fetching_product_item:false});

    default:
      return state;
  }
}
