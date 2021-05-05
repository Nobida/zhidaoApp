//
// Book
// --------------------------------------------------

import { getBookList, getBookDetail } from "../api/book";
import bindApiKey from '../utils/bindApiKey';

export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_BOOKS_PENDING = 'FETCH_BOOKS_PENDING';
export const FETCH_BOOKS_FULFILLED = 'FETCH_BOOKS_FULFILLED';
export const FETCH_BOOKS_REJECTED = 'FETCH_BOOKS_REJECTED';

export function fetchBooks() {
  return {
    type: FETCH_BOOKS,
    payload: bindApiKey(getBookList)
  };
}

export const FETCH_BOOK_DETAIL = 'FETCH_BOOK_DETAIL';
export const FETCH_BOOK_DETAIL_PENDING = 'FETCH_BOOK_DETAIL_PENDING';
export const FETCH_BOOK_DETAIL_FULFILLED = 'FETCH_BOOK_DETAIL_FULFILLED';
export const FETCH_BOOK_DETAIL_REJECTED = 'FETCH_BOOK_DETAIL_REJECTED';

export function fetchBookDetail(bookId) {
  return {
    type: FETCH_BOOK_DETAIL,
    payload: bindApiKey(getBookDetail,bookId),
    meta:{
      bookId:bookId
    }
  };
}
