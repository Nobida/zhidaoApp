import {
  FETCH_ARTICLES_FULFILLED,
  FETCH_ARTICLES_REJECTED,
  FETCH_ARTICLES_PENDING,
} from '../../actions/article';

const initialState = {
  fetching_articles:false,
  next_url:null,
  articles:[]
};
export default function articles(state = initialState, action = {}) {
  switch (action.type) {

    case FETCH_ARTICLES_PENDING:
      console.log('fetching articles');
      return Object.assign({}, state, {fetching_articles: true});

    case FETCH_ARTICLES_FULFILLED:
      console.log('fetch articles success');
      console.log(action);
      const articles_get = (action.meta.firstPage ?
        action.payload.results : state.articles.concat(action.payload.results)
      );
      return Object.assign({}, state,
        {
          articles: articles_get,
          fetching_articles: false,
          next_url:action.payload.next
        });
    default:
      return state;
  }
}
