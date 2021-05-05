import {BASIC_URL} from './const';

export function getCart(apikey) {
  const GET_CART_URL = BASIC_URL + "product_item/?in_cart=true&apikey="+apikey;
  console.log(GET_CART_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_CART_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get product cart success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get product cart failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}


export function postCart(data,apikey) {
  const POST_CART_URL = BASIC_URL + "add_to_cart/?product="+data.uuid+"&apikey="+apikey;
  console.log(POST_CART_URL);
  console.log(data);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: POST_CART_URL,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('post product into cart success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('post product into cart failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}


export function deleteProductItem(ItemId,apikey) {
  const DELETE_Product_Item_URL = BASIC_URL + "product_item/"+ItemId+"/?apikey="+apikey;
  console.log(DELETE_Product_Item_URL);
  console.log(ItemId);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'DELETE',
      url: DELETE_Product_Item_URL,
      timeout: 5000,
      success: function(responseData){
        console.log('delete product item from cart success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('delete product item from cart failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function clearAllCart(apikey){
  const CLEAR_CART_URL = BASIC_URL + "clear_cart/?apikey="+apikey;

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: CLEAR_CART_URL,
      timeout: 5000,
      success: function(responseData){
        console.log('clear cart success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('clear cart failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}
