//
// Article
// --------------------------------------------------

import { getArticlesWithCursor,getArticle } from "../api/article";
import bindApiKey from '../utils/bindApiKey';

export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const FETCH_ARTICLES_PENDING = 'FETCH_ARTICLES_PENDING';
export const FETCH_ARTICLES_FULFILLED = 'FETCH_ARTICLES_FULFILLED';
export const FETCH_ARTICLES_REJECTED = 'FETCH_ARTICLES_REJECTED';

export const FETCH_ARTICLE = 'FETCH_ARTICLE'
export const FETCH_ARTICLE_PENDING = 'FETCH_ARTICLE_PENDING';
export const FETCH_ARTICLE_FULFILLED = 'FETCH_ARTICLE_FULFILLED'
export const FETCH_ARTICLE_REJECTED = 'FETCH_ARTICLE_REJECTED'


export function fetchArticles(url) {
  return {
    type: FETCH_ARTICLES,
    payload: bindApiKey(getArticlesWithCursor,[url]),
    meta:{
      firstPage: (url == null),
    }
  };
}
export function fetchArticle(articleId) {
  return {
    type: FETCH_ARTICLE,
    payload: bindApiKey(getArticle,[articleId]),
  }
}