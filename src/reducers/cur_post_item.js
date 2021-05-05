import {
  FETCH_POST_BY_ID_PENDING,
  FETCH_POST_BY_ID_FULFILLED,
  FETCH_POST_BY_ID_REJECTED,
  TOGGLE_FAVOR_OF_POST_PENDING,
  TOGGLE_FAVOR_OF_POST_FULFILLED,
  TOGGLE_FAVOR_OF_POST_REJECTED
} from '../actions/post';

const initialState = {
  fetching_post: false,
  need_update: false,
  post: {}
};
export default function cur_post(state = initialState, action = {}) {
  switch (action.type) {

    case FETCH_POST_BY_ID_PENDING:
      console.log('fetching post by id');
      return Object.assign({}, state, { fetching_post: true });

    case FETCH_POST_BY_ID_FULFILLED:
      console.log('fetch post by id success');
      return Object.assign({}, state, {
        fetching_post: false,
        need_update: false,
        post: action.payload
      });

    case TOGGLE_FAVOR_OF_POST_PENDING:
      console.log('toggling favor of post');
      return state;

    case TOGGLE_FAVOR_OF_POST_FULFILLED:
      console.log('toggle favor of post success');
      console.log(action);
      if ("no_action" == action.payload.results || state.post.uuid != action.meta.postID) {
        console.log('no action');
        return state;
      }
      console.log('toggle favor in cur_post');
      console.log(action);
      const rated = ("added" == action.payload.result ? true : false);
      const post = Object.assign({}, state.post, { rated });
      return Object.assign({}, state, {
        post,
        need_update: true
      });

    default:
      return state;
  }
}
