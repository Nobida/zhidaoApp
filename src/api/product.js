import {BASIC_URL} from './const';


export function getProductList(apikey) {
  const GET_PRODUCT_LIST_URL = BASIC_URL + "product/?on_shelf=true&apikey="+apikey;
  console.log(GET_PRODUCT_LIST_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_PRODUCT_LIST_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get product list success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get product list failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getProductDetail(productId,apikey) {
  const GET_PRODUCT_DETAIL_URL = BASIC_URL + "product/"+productId+"/?apikey="+apikey;
  console.log(GET_PRODUCT_DETAIL_URL);

  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_PRODUCT_DETAIL_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get product detail success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get product detail failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}
