/**
 * article.js
 *
 * Article related api requests
 *
 */

import {BASIC_URL} from './const';
const ARTICLE_URL = BASIC_URL + "article";

export function getArticle(article_id, apikey) {
  const GET_ARTICLE_URL = ARTICLE_URL + '/' + article_id + "?apikey="+ apikey
  console.log(GET_ARTICLE_URL)
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_ARTICLE_URL,
      dataType: 'json',
      timeout: 5000,
      success: function(responseData){
        resolve(responseData);
      },
      error: function(error){
        console.log('get article  failed!');
        console.log(error);
        reject(error);
      }
    })
  })
  return promise;
}

export function getArticlesWithCursor(url, apikey) {
  const GET_ARTICLE_LIST_URL = url ? url : (
    ARTICLE_URL+"?apikey="+apikey+"&public=true&page=1"
  );
  console.log(GET_ARTICLE_LIST_URL);
  let promise = new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: GET_ARTICLE_LIST_URL,
      dataType: "json",
      timeout: 5000,
      success: function(responseData){
        console.log('get article list success');
        console.log(responseData);
        resolve(responseData);
      },
      error: function(error){
        console.log('get article list failed!');
        console.log(error);
        reject(error);
      }
    });
  });
  return promise;
}

