import {
  FETCH_CARTS_PENDING,
  FETCH_CARTS_FULFILLED,
  FETCH_CARTS_REJECTED,
  ADD_PRODUCT_INTO_CARTS,
  ADD_PRODUCT_INTO_CARTS_PENDING,
  ADD_PRODUCT_INTO_CARTS_FULFILLED,
  ADD_PRODUCT_INTO_CARTS_REJECTED,
  DELETE_PRODUCT_FROM_CARTS,
  DELETE_PRODUCT_FROM_CARTS_PENDING,
  DELETE_PRODUCT_FROM_CARTS_FULFILLED,
  DELETE_PRODUCT_FROM_CARTS_REJECTED,
  CLEAR_CART,
  CLEAR_CART_FULFILLED,
  CLEAR_CART_PENDING
} from '../actions/cart';

const initialState = {
  fetching_carts:false,
  adding_carts:false,
  add_success:false,
  deleting_item: false,
  delete_success:false,
  clearing_cart: false,
  carts:[],
  add_ret:{},
};
export default function carts(state = initialState, action = {}) {
  switch (action.type) {

    case FETCH_CARTS_PENDING:
        console.log('fetching carts');
        return Object.assign({}, state, {carts: [],fetching_carts: true});

    case FETCH_CARTS_FULFILLED:
        console.log('fetch carts success');
        console.log(action);
        return Object.assign({}, state, {carts: action.payload,fetching_carts:false});

    case ADD_PRODUCT_INTO_CARTS_PENDING:
        console.log('adding product into cart');
        return Object.assign({}, state, {add_ret: {},adding_carts:true, add_success: false});

    case ADD_PRODUCT_INTO_CARTS_FULFILLED:
        console.log('add product into carts success');
        console.log(action);
        return Object.assign({}, state, {add_ret:action.payload,adding_carts:false, add_success: true});

    case ADD_PRODUCT_INTO_CARTS_REJECTED:
        console.log('add product into carts rejected');
        console.log(action);
        return Object.assign({}, state, {adding_carts:false, add_success: false});

    case DELETE_PRODUCT_FROM_CARTS_PENDING:
        console.log('deleting item from cart');
        return Object.assign({}, state, { deleting_item:true, delete_success: false});

    case DELETE_PRODUCT_FROM_CARTS_FULFILLED:
        console.log('delete product from cart success');
        console.log(action);
        return Object.assign({}, state, {delete_success: true, deleting_item: false});

    case DELETE_PRODUCT_FROM_CARTS_REJECTED:
        console.log('delete product from cart rejected');
        console.log(action);
        return Object.assign({}, state, {delete_success: false, deleting_item: false});

    case CLEAR_CART_PENDING:
        return Object.assign({}, state, {clearing_cart: true})
    case CLEAR_CART_FULFILLED:
        return Object.assign({}, state, {clearing_car: false})
    default:
      return state;
  }
}
