
import { ROOT_URL, BASIC_URL } from './const';


export function getCreditStatus(apikey){
    const GET_CREDIT_STATUS_API = BASIC_URL+'credit_stat/?apikey='+ apikey ;
    console.log(GET_CREDIT_STATUS_API);
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        type: "GET",
        url: GET_CREDIT_STATUS_API,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        timeout: 5000,
        success: function(responseData){
          console.log('get credit status success');
          console.log(responseData);
          resolve(responseData);
        },
        error: function(error){
          console.log('get credit status failed!');
          console.log(error);
          reject(error.message);
        }
      });
    });
    return promise;
}

export function getCreditItemList(apikey) {
    const GET_CREDIT_ITEM_LIST_API = BASIC_URL + "credit_item/?apikey="+ apikey;
    console.log(GET_CREDIT_ITEM_LIST_API);
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        type: "GET",
        url: GET_CREDIT_ITEM_LIST_API,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        timeout: 5000,
        success: function(responseData){
          console.log('get credit item list uccess');
          console.log(responseData);
          resolve(responseData);
        },
        error: function(error){
          console.log('get credit item list failed!');
          console.log(error);
          reject(error.message);
        }
      });
    });
    return promise;
  }

export function getCreditPayRecord(apikey) {
    const GET_CREDIT_PAY_RECORD_API = BASIC_URL + 'credit_pay_record/?apikey='+ apikey;
    console.log(GET_CREDIT_PAY_RECORD_API);
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        type: "GET",
        url: GET_CREDIT_PAY_RECORD_API,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        timeout: 5000,
        success: function(responseData){
          console.log('get credit item list uccess');
          console.log(responseData);
          resolve(responseData);
        },
        error: function(error){
          console.log('get credit item list failed!');
          console.log(error);
          reject(error.message);
        }
      });
    });
    return promise;
  }

