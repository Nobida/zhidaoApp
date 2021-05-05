import {
  FETCH_ARTICLE_FULFILLED,
  FETCH_ARTICLE_REJECTED,
  FETCH_ARTICLE_PENDING,
} from '../../actions/article';

const initialState = {
  fetching_article:false,
  article:{}
};
export default function article(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_ARTICLE_PENDING:
      console.log('fetching article');
      return Object.assign({}, state, {fetching_article: true,article:{}});

    case FETCH_ARTICLE_FULFILLED:
      console.log('fetch articles success');
      console.log(action);
      return Object.assign({}, state,
        {
          article: action.payload,
          fetching_article: false,
        });
    default:
      return state;
  }
}
