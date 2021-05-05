import { combineReducers } from 'redux';
import cur_post_gift from './cur_post_gift';
import gifts from './gifts';
import cur_gift from './cur_gift';
import cur_delete_gift from './cur_delete_gift';
import cur_coupon from './cur_coupon';
import cur_received_gift from './cur_received_gift'
import gift_products from './gift_products'
const gift = combineReducers({
  cur_post_gift,
  gifts,
  cur_gift,
  cur_delete_gift,
  cur_coupon,
  cur_received_gift,
  gift_products
});
export default gift;
