import {BASIC_URL} from './const';
import {postCart,clearAllCart} from "./cart";

export function collectCart(use_score,apikey) {
  const COLLECT_ORDER_URL = BASIC_URL + "collect_cart/?use_score="+use_score+"&apikey="+apikey;
  console.log(COLLECT_ORDER_URL);
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: COLLECT_ORDER_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('collect order success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('collect order failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function buyItem(dataID,apikey) {
  const BUY_ITEM_URL = BASIC_URL + "collect_cart/?use_score=true&product_items="+dataID+"&apikey="+apikey;
  console.log(BUY_ITEM_URL);
  let data = {use_score: true};
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: BUY_ITEM_URL,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('buyItem success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('buyItem failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function buyImmediately(product_id,apikey){
  const BUY_IMMEDIATELY_URL = BASIC_URL + "buy_immediately/?apikey="+apikey+"&product=course:"+product_id
  console.log(BUY_IMMEDIATELY_URL)
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: BUY_IMMEDIATELY_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('buy immediately success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('buy immediately failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function checkDiscount(product,apikey) {
  const CHECK_DISCOUNT_URL = BASIC_URL + "check_discount/?apikey="+apikey+'&product=course:'+product
  console.log(CHECK_DISCOUNT_URL);
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: CHECK_DISCOUNT_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('check discount success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('check discount failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getCreatedOrders(apikey) {
  const GET_CREATED_ORDERLIST_URL = BASIC_URL + "product_order/?status=created&apikey="+apikey;
  console.log(GET_CREATED_ORDERLIST_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_CREATED_ORDERLIST_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get created order list success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get created order list failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getCreatedOrder(orderID,apikey) {
  const GET_CREATED_ORDER_URL = BASIC_URL + "product_order/"+orderID+"/?status=created&apikey="+apikey;
  console.log(GET_CREATED_ORDER_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_CREATED_ORDER_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get created order success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get created order failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function modifyOrderMsg(data,apikey) {
  const MODIFY_ORDER_MSG_URL = BASIC_URL + "product_order/"+data.orderID+"/?status=created&apikey="+apikey;
  console.log(MODIFY_ORDER_MSG_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'PUT',
      url: MODIFY_ORDER_MSG_URL,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get created order success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get created order failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getOrders(status, apikey) {
  let GET_ORDERLIST_URL;
  switch (status) {
    case 'payed':
      GET_ORDERLIST_URL = BASIC_URL + "product_order/?status=payed&apikey="+apikey;
      break;
    case 'created':
      GET_ORDERLIST_URL = BASIC_URL + "product_order/?status=created&apikey="+apikey;
      break;
    default:
      GET_ORDERLIST_URL = BASIC_URL + "product_order/?apikey="+apikey;

  }
  console.log(GET_ORDERLIST_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_ORDERLIST_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get order list success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get order list failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}


export function deleteOrder(orderId, apikey) {
  const DELETE_ORDER_URL = BASIC_URL + "product_order/"+orderId+"/?apikey="+apikey;
  console.log(DELETE_ORDER_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'DELETE',
      url: DELETE_ORDER_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('delete order  success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('delete order failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}


export function confirmOrder(orderId, apikey) {
  const CONFIRM_ORDER_URL = BASIC_URL + "confirm_received/?apikey="+apikey+"&product_order="+orderId;
  console.log(CONFIRM_ORDER_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: CONFIRM_ORDER_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('confirm order success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('comfirm order failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function createProductsOrder(products,apikey){
  let promise = clearAllCart(apikey)
  for(let i=0;i<products.length;i++){
    promise = promise.then(function(d){
      console.log('added')
      console.log(d)
      return postCart(products[i],apikey)
    })
  }
  promise = promise.then(res =>{
      console.log(res)
      return collectCart(false, apikey)
  })
  promise.then(res=> {
    console.log('collect')
    console.log(res)
  })
  return promise;
}


