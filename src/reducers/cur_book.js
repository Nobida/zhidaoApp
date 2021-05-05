import {
  FETCH_BOOK_DETAIL_PENDING,
  FETCH_BOOK_DETAIL_FULFILLED,
  FETCH_BOOK_DETAIL_REJECTED,
} from '../actions/book';

const initialState = {
  fetching_book_detail:false,
  uri: null,
  title: null,
  subtitle: null,
  desc: null,
  authors: null,
  arch_info:null,
  toc: null,
  intro: null
};
export default function cur_book(state = initialState, action = {}) {
  switch (action.type) {

    case FETCH_BOOK_DETAIL_PENDING:
      console.log('fetching book detail');
      return Object.assign({}, state, {fetching_books: true});

    case FETCH_BOOK_DETAIL_FULFILLED:
      console.log('fetch book detail success');
      console.log(action);
      const book_info = action.payload;
      return Object.assign({}, state, {
        uri: book_info.uri,
        title: book_info.title,
        subtitle: book_info.subtitle,
        desc: book_info.subtitle,
        authors: book_info.authors,
        arch_info: book_info.arch_info,
        toc: book_info.toc,
        intro: book_info.intro,
        fetching_book_detail: false
      });

    default:
      return state;
  }
}


