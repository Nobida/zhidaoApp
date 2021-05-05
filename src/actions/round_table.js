import {
  getRoundTableListByBook,
  getRoundTableListByCourse,
  getRoundTableList,
  getNoteByRoundTable,
  getQuestionByRoundTable,
  getPostByRoundTable,
  getMediaByRoundTable
} from "../api/round_table";
import bindApiKey from '../utils/bindApiKey';

export const FETCH_ROUND_TABLE_LIST = 'FETCH_ROUND_TABLE_LIST';
export const FETCH_ROUND_TABLE_LIST_PENDING = 'FETCH_ROUND_TABLE_LIST_PENDING';
export const FETCH_ROUND_TABLE_LIST_FULFILLED = 'FETCH_ROUND_TABLE_LIST_FULFILLED';
export const FETCH_ROUND_TABLE_LIST_REJECTED = 'FETCH_ROUND_TABLE_LIST_REJECTED';

export function fetchRoundTableListByCourse(course_id) {
  return {
    type: FETCH_ROUND_TABLE_LIST,
    payload: bindApiKey(getRoundTableListByCourse,course_id)
  };
}

export function fetchRoundTableList() {
  return {
    type: FETCH_ROUND_TABLE_LIST,
    payload: bindApiKey(getRoundTableList)
  };
}

export function fetchRoundTableListByBook(book_id) {
  return {
    type: FETCH_ROUND_TABLE_LIST,
    payload: bindApiKey(getRoundTableListByBook,book_id)
  };
}


export const FETCH_ROUND_TABLE_NOTE           = 'FETCH_ROUND_TABLE_NOTE';
export const FETCH_ROUND_TABLE_NOTE_PENDING   = 'FETCH_ROUND_TABLE_NOTE_PENDING';
export const FETCH_ROUND_TABLE_NOTE_FULFILLED = 'FETCH_ROUND_TABLE_NOTE_FULFILLED';
export const FETCH_ROUND_TABLE_NOTE_REJECTED  = 'FETCH_ROUND_TABLE_NOTE_REJECTED';
export function fetchRoundTableNote(roundTable, url) {
  return {
    type: FETCH_ROUND_TABLE_NOTE,
    payload: bindApiKey(getNoteByRoundTable,[roundTable, url]),
    meta: {
      firstPage: (url == null), // url为null时表示获取第一页
    }
  }
}

export const FETCH_ROUND_TABLE_QUESTION           = 'FETCH_ROUND_TABLE_QUESTION';
export const FETCH_ROUND_TABLE_QUESTION_PENDING   = 'FETCH_ROUND_TABLE_QUESTION_PENDING';
export const FETCH_ROUND_TABLE_QUESTION_FULFILLED = 'FETCH_ROUND_TABLE_QUESTION_FULFILLED';
export const FETCH_ROUND_TABLE_QUESTION_REJECTED  = 'FETCH_ROUND_TABLE_QUESTION_REJECTED';
export function fetchRoundTableQuestion(roundTable, url) {
  return {
    type: FETCH_ROUND_TABLE_QUESTION,
    payload: bindApiKey(getQuestionByRoundTable,[roundTable, url]),
    meta: {
      firstPage: (url == null), // url为null时表示获取第一页
    }
  }
}

export const FETCH_ROUND_TABLE_POST           = 'FETCH_ROUND_TABLE_POST';
export const FETCH_ROUND_TABLE_POST_PENDING   = 'FETCH_ROUND_TABLE_POST_PENDING';
export const FETCH_ROUND_TABLE_POST_FULFILLED = 'FETCH_ROUND_TABLE_POST_FULFILLED';
export const FETCH_ROUND_TABLE_POST_REJECTED  = 'FETCH_ROUND_TABLE_POST_REJECTED';
export function fetchRoundTablePost(roundTable, url) {
  return {
    type: FETCH_ROUND_TABLE_POST,
    payload: bindApiKey(getPostByRoundTable,[roundTable, url]),
    meta: {
      firstPage: (url == null), // url为null时表示获取第一页
    }
  }
}

export const FETCH_ROUND_TABLE_MEDIA           = 'FETCH_ROUND_TABLE_MEDIA';
export const FETCH_ROUND_TABLE_MEDIA_PENDING   = 'FETCH_ROUND_TABLE_MEDIA_PENDING';
export const FETCH_ROUND_TABLE_MEDIA_FULFILLED = 'FETCH_ROUND_TABLE_MEDIA_FULFILLED';
export const FETCH_ROUND_TABLE_MEDIA_REJECTED  = 'FETCH_ROUND_TABLE_MEDIA_REJECTED';
export function fetchRoundTableMedia(roundTable, url) {
  return {
    type: FETCH_ROUND_TABLE_MEDIA,
    payload: bindApiKey(getMediaByRoundTable,[roundTable, url]),
    meta: {
      firstPage: (url == null), // url为null时表示获取第一页
    }
  }
}
