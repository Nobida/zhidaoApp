import {
  FETCH_ROUND_TABLE_MEDIA_PENDING,
  FETCH_ROUND_TABLE_MEDIA_FULFILLED,
  FETCH_ROUND_TABLE_MEDIA_REJECTED
} from '../../actions/round_table';

const initialState = {
  fetching: false,
  next_url: true,
  content:[]
};
export default function round_table_countent_media(state = initialState, action = {}) {
  switch (action.type) {

    case FETCH_ROUND_TABLE_MEDIA_PENDING:
      console.log('fetching round table content');
      console.log(action);
      return Object.assign({}, state, { fetching: true });

    case FETCH_ROUND_TABLE_MEDIA_FULFILLED:
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

    case FETCH_ROUND_TABLE_MEDIA_REJECTED:
      console.log('fetch round table content error');
      console.log(action);
      return Object.assign({}, state, { fetching: false });

    default:
      return state;
  }
}
