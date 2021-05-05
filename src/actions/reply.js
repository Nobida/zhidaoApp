import {
  postReply,
  deleteReplyPromise,
  getPostReplys,
  rateReply,
} from "../api/reply";
import bindApiKey from '../utils/bindApiKey';


export const POST_REPLY = 'POST_REPLY';
export const POST_REPLY_PENDING = 'POST_REPLY_PENDING';
export const POST_REPLY_FULFILLED = 'POST_REPLY_FULFILLED';
export const POST_REPLY_REJECTED = 'POST_REPLY_REJECTED';

export function createReply(formData){
   return {
      type: POST_REPLY,
      payload: bindApiKey(postReply, formData),
   }
}

export const DELETE_REPLY = 'DELETE_REPLY';
export const DELETE_REPLY_PENDING = 'DELETE_REPLY_PENDING';
export const DELETE_REPLY_FULFILLED = 'DELETE_REPLY_FULFILLED';
export const DELETE_REPLY_REJECTED = 'DELETE_REPLY_REJECTED';

export function deleteReply(replyID, postID){
  return {
      type: DELETE_REPLY,
      payload: bindApiKey(deleteReplyPromise, [replyID, postID]),
   }
}

export const FETCH_REPLYS = 'FETCH_REPLYS';
export const FETCH_REPLYS_PENDING = 'FETCH_REPLYS_PENDING';
export const FETCH_REPLYS_FULFILLED = 'FETCH_REPLYS_FULFILLED';
export const FETCH_REPLYS_REJECTED = 'FETCH_REPLYS_REJECTED';

export function fetchPostReplys(postID, page){
  return {
    type: FETCH_REPLYS,
    payload: bindApiKey(getPostReplys,[postID, page]),
    meta: { page }
  };
}

export const TOGGLE_FAVOR_OF_REPLY = 'TOGGLE_FAVOR_OF_REPLY';
export const TOGGLE_FAVOR_OF_REPLY_PENDING = 'TOGGLE_FAVOR_OF_REPLY_PENDING';
export const TOGGLE_FAVOR_OF_REPLY_FULFILLED = 'TOGGLE_FAVOR_OF_REPLY_FULFILLED';
export const TOGGLE_FAVOR_OF_REPLY_REJECTED = 'TOGGLE_FAVOR_OF_REPLY_REJECTED';

export function toggleFavorOfReply(replyID, rated, userData) {
  return {
    type: TOGGLE_FAVOR_OF_REPLY,
    payload: bindApiKey(rateReply, [replyID, rated]),
    meta: {
      reply_id: replyID,
      user_data: userData
    }
  };
}