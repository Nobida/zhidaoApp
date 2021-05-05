import {  getCart, postCart, deleteProductItem, clearAllCart, createProductsOrder} from "../api/cart";
import bindApiKey from '../utils/bindApiKey';

export const FETCH_CARTS = 'FETCH_CARTS';
export const FETCH_CARTS_PENDING = 'FETCH_CARTS_PENDING';
export const FETCH_CARTS_FULFILLED = 'FETCH_CARTS_FULFILLED';
export const FETCH_CARTS_REJECTED = 'FETCH_CARTS_REJECTED';

export function fetchCarts() {
  return {
    type: FETCH_CARTS,
    payload: bindApiKey(getCart),
  };
}

export const ADD_PRODUCT_INTO_CARTS = 'ADD_PRODUCT_INTO_CARTS';
export const ADD_PRODUCT_INTO_CARTS_PENDING = 'ADD_PRODUCT_INTO_CARTS_PENDING';
export const ADD_PRODUCT_INTO_CARTS_FULFILLED = 'ADD_PRODUCT_INTO_CARTS_FULFILLED';
export const ADD_PRODUCT_INTO_CARTS_REJECTED = 'ADD_PRODUCT_INTO_CARTS_REJECTED';

export function addProduceIntoCarts(data) {
  return {
    type: ADD_PRODUCT_INTO_CARTS,
    payload: bindApiKey(postCart,data),
  };
}

export const DELETE_PRODUCT_FROM_CARTS = 'DELETE_PRODUCT_FROM_CARTS';
export const DELETE_PRODUCT_FROM_CARTS_PENDING = 'DELETE_PRODUCT_FROM_CARTS_PENDING';
export const DELETE_PRODUCT_FROM_CARTS_FULFILLED = 'DELETE_PRODUCT_FROM_CARTS_FULFILLED';
export const DELETE_PRODUCT_FROM_CARTS_REJECTED = 'DELETE_PRODUCT_FROM_CARTS_REJECTED';

export function deleteProductFromCart(data) {
  return {
    type: DELETE_PRODUCT_FROM_CARTS,
    payload: bindApiKey(deleteProductItem,data),
  };
}

export const CLEAR_CART = 'CLEAR_CART'
export const CLEAR_CART_PENDING = 'CLEAR_CART_PENDING'
export const CLEAR_CART_FULFILLED = 'CLEAR_CART_FULFILLED'
export const CLEAR_CART_REJECTED = 'CLEAR_CART_REJECTED'

export function clearCart(){
  return {
    type: CLEAR_CART,
    payload: bindApiKey(clearAllCart),
  };
}

