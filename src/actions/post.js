import {
  postPost,
  deletePostPromise,
  getPost,
  ratePost,
} from "../api/post";
import bindApiKey from '../utils/bindApiKey';


export const POST_POST = 'POST_POST';
export const POST_POST_PENDING = 'POST_POST_PENDING';
export const POST_POST_FULFILLED = 'POST_POST_FULFILLED';
export const POST_POST_REJECTED = 'POST_POST_REJECTED';

export function createPost(contents,title,round_table){
  return {
    type: POST_POST,
    payload: bindApiKey(postPost, {
      contents,
      title,
      round_table
    }),
  }
}

export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_PENDING = 'DELETE_POST_PENDING';
export const DELETE_POST_FULFILLED = 'DELETE_POST_FULFILLED';
export const DELETE_POST_REJECTED = 'DELETE_POST_REJECTED';

export function deletePost(postID,round_table) {
  return {
      type: DELETE_POST,
      payload: bindApiKey(deletePostPromise, [postID, round_table]),
      meta: {
        postID,
      }
   }
}

export const FETCH_POST_BY_ID = 'FETCH_POST_BY_ID';
export const FETCH_POST_BY_ID_PENDING = 'FETCH_POST_BY_ID_PENDING';
export const FETCH_POST_BY_ID_FULFILLED = 'FETCH_POST_BY_ID_FULFILLED';
export const FETCH_POST_BY_ID_REJECTED = 'FETCH_POST_BY_ID_REJECTED';

export function fetchPostByID(postID,round_table) {
  return {
    type: FETCH_POST_BY_ID,
    payload: bindApiKey(getPost, [postID, round_table])
  };
}

export const TOGGLE_FAVOR_OF_POST = 'TOGGLE_FAVOR_OF_POST';
export const TOGGLE_FAVOR_OF_POST_PENDING = 'TOGGLE_FAVOR_OF_POST_PENDING';
export const TOGGLE_FAVOR_OF_POST_FULFILLED = 'TOGGLE_FAVOR_OF_POST_FULFILLED';
export const TOGGLE_FAVOR_OF_POST_REJECTED = 'TOGGLE_FAVOR_OF_POST_REJECTED';

export function toggleFavorOfPost(postID, rated) {
  return {
    type: TOGGLE_FAVOR_OF_POST,
    payload: bindApiKey(ratePost, [postID, rated]),
    meta:{
      postID,
      rated
    }
  };
}
