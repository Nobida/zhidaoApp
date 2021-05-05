import {
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_FULFILLED,
  FETCH_PRODUCTS_REJECTED,
} from '../actions/product';

const initialState = {
  fetching_products:false,
  products:[],
};
export default function products(state = initialState, action = {}) {
  switch (action.type) {

    case FETCH_PRODUCTS_PENDING:
        console.log('fetching products');
        return Object.assign({}, state, {fetching_products: true, products:[]});

    case FETCH_PRODUCTS_FULFILLED:
        console.log('fetch products success');
        console.log(action);
        return Object.assign({}, state, {products: action.payload,fetching_products:false});

    default:
      return state;
  }
}
