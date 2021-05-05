import { ROOT_URL, BASIC_URL } from './const';


export function getOrderRecord(orderId, apikey) {
  const GET_ORDER_RECORD_API = ROOT_URL + "api/v3/" + "product_order/" + orderId + "/?apikey=" + apikey;
  console.log(GET_ORDER_RECORD_API);
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: GET_ORDER_RECORD_API,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get credit order record success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get credit order record failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

export function getOrderDetailRecord(orderId, apikey) {
  const GET_ORDER_DETAIL_RECORD_API = ROOT_URL + "api/v3/" + "order/" + orderId + "/?apikey=" + apikey;
  console.log(GET_ORDER_DETAIL_RECORD_API);
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: GET_ORDER_DETAIL_RECORD_API,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get order detail record success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get order detail record failed!');
        console.log(error);
        reject(error.message);
      }
    });
  });
  return promise;
}

