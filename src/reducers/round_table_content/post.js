import {
  FETCH_ROUND_TABLE_POST_PENDING,
  FETCH_ROUND_TABLE_POST_FULFILLED,
  FETCH_ROUND_TABLE_POST_REJECTED
} from '../../actions/round_table';
import {
  DELETE_POST_FULFILLED,
  TOGGLE_FAVOR_OF_POST_FULFILLED,
} from '../../actions/post';
import { getItemIndexInList } from '../../utils';

const initialState = {
  fetching: false,
  next_url: true,
  content:[]
};
export default function round_table_countent_post(state = initialState, action = {}) {
  switch (action.type) {

    case FETCH_ROUND_TABLE_POST_PENDING:
      console.log('fetching round table content');
      console.log(action);
      return Object.assign({}, state, { fetching: true });

    case FETCH_ROUND_TABLE_POST_FULFILLED:
      console.log('fetch round table content success');
      console.log(action);
      const content_get = (action.meta.firstPage ?
        action.payload.results : state.content.concat(action.payload.results)
      );
      return Object.assign({}, state, {
        fetching: false,
        next_url: action.payload.next,
        content: content_get,
      });

    case DELETE_POST_FULFILLED:
      console.log('delete post success');
      console.log(action);
      const content_del = state.content.filter(item => {
        if (action.meta.postID == item.uuid) {
          console.log('delete post in round table');
          return false;
        }
        return true;
      });
      return Object.assign({}, state, {
        content: content_del,
      });

    case TOGGLE_FAVOR_OF_POST_FULFILLED:
      console.log('toggle favor of post success');
      console.log(action);
      if ("no_action" == action.payload.results) {
        return state;
      }
      const ratePostId = getItemIndexInList(action.meta.postID, state.content);
      if (ratePostId != -1) {
        console.log('toggle favor in round table post');
        const rated = ("added" == action.payload.result ? true : false);
        let content = state.content.map(function(d){ return d });
        content[ratePostId].rated = rated;
        content[ratePostId].rating += (rated ? 1 : -1);
        return Object.assign({}, state, {
          content
        });
      } else {
        return state;
      }

    case FETCH_ROUND_TABLE_POST_REJECTED:
      console.log('fetch round table content error');
      console.log(action);
      return Object.assign({}, state, { fetching: false });

    default:
      return state;
  }
}
