import {
  postComment,
  deleteCommentPromise,
  getNoteComments,
  rateComment,
} from "../api/comment";
import bindApiKey from '../utils/bindApiKey';


export const POST_COMMENT = 'POST_COMMENT';
export const POST_COMMENT_PENDING = 'POST_COMMENT_PENDING';
export const POST_COMMENT_FULFILLED = 'POST_COMMENT_FULFILLED';
export const POST_COMMENT_REJECTED = 'POST_COMMENT_REJECTED';

export function createComment(formData){
   return {
      type: POST_COMMENT,
      payload: bindApiKey(postComment, formData),
   }
}

export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_COMMENT_PENDING = 'DELETE_COMMENT_PENDING';
export const DELETE_COMMENT_FULFILLED = 'DELETE_COMMENT_FULFILLED';
export const DELETE_COMMENT_REJECTED = 'DELETE_COMMENT_REJECTED';

export function deleteComment(commentID, noteID){
  return {
      type: DELETE_COMMENT,
      payload: bindApiKey(deleteCommentPromise, [commentID, noteID]),
   }
}

export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const FETCH_COMMENTS_PENDING = 'FETCH_COMMENTS_PENDING';
export const FETCH_COMMENTS_FULFILLED = 'FETCH_COMMENTS_FULFILLED';
export const FETCH_COMMENTS_REJECTED = 'FETCH_COMMENTS_REJECTED';

export function fetchNoteComments(noteID, page){
  return {
    type: FETCH_COMMENTS,
    payload: bindApiKey(getNoteComments,[noteID, page]),
    meta: { page }
  };
}

export const TOGGLE_FAVOR_OF_COMMENT = 'TOGGLE_FAVOR_OF_COMMENT';
export const TOGGLE_FAVOR_OF_COMMENT_PENDING = 'TOGGLE_FAVOR_OF_COMMENT_PENDING';
export const TOGGLE_FAVOR_OF_COMMENT_FULFILLED = 'TOGGLE_FAVOR_OF_COMMENT_FULFILLED';
export const TOGGLE_FAVOR_OF_COMMENT_REJECTED = 'TOGGLE_FAVOR_OF_COMMENT_REJECTED';

export function toggleFavorOfComment(commentID, rated, userData) {
  return {
    type: TOGGLE_FAVOR_OF_COMMENT,
    payload: bindApiKey(rateComment, [commentID, rated]),
    meta: {
      comment_id: commentID,
      user_data: userData
    }
  };
}