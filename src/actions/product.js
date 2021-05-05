import { getProductList, getProductDetail} from "../api/product";
import bindApiKey from '../utils/bindApiKey';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_PENDING = 'FETCH_PRODUCTS_PENDING';
export const FETCH_PRODUCTS_FULFILLED = 'FETCH_PRODUCTS_FULFILLED';
export const FETCH_PRODUCTS_REJECTED = 'FETCH_PRODUCTS_REJECTED';

export function fetchProducts() {
  return {
    type: FETCH_PRODUCTS,
    payload: bindApiKey(getProductList)
  };
}

export const FETCH_PRODUCT_DETAIL = 'FETCH_PRODUCT_DETAIL';
export const FETCH_PRODUCT_DETAIL_PENDING = 'FETCH_PRODUCT_DETAIL_PENDING';
export const FETCH_PRODUCT_DETAIL_FULFILLED = 'FETCH_PRODUCT_DETAIL_FULFILLED';
export const FETCH_PRODUCT_DETAIL_REJECTED = 'FETCH_PRODUCT_DETAIL_REJECTED';

export function fetchProductDetail(data) {
  return {
    type: FETCH_PRODUCT_DETAIL,
    payload: bindApiKey(getProductDetail,data)
  };
}

