import {
  POST_COMMENT_PENDING,
  POST_COMMENT_FULFILLED,
  POST_COMMENT_REJECTED,
  FETCH_COMMENTS_PENDING,
  FETCH_COMMENTS_FULFILLED,
  FETCH_COMMENTS_REJECTED,
  DELETE_COMMENT_PENDING,
  DELETE_COMMENT_FULFILLED,
  DELETE_COMMENT_REJECTED,
  TOGGLE_FAVOR_OF_COMMENT_PENDING,
  TOGGLE_FAVOR_OF_COMMENT_FULFILLED,
  TOGGLE_FAVOR_OF_COMMENT_REJECTED,
} from '../actions/comment';

const initialState = {
  fetching_comments: false,
  need_update: false,
  next_page: 1,
  comments:[]
};
export default function comments(state = initialState, action = {}) {
  switch (action.type) {

    case POST_COMMENT_PENDING:
      console.log('posting comment');
      return state;

    case POST_COMMENT_FULFILLED:
      console.log('post comment success');
      return Object.assign({}, state, { need_update: true });

    case FETCH_COMMENTS_PENDING:
      console.log('fetching comments');
      console.log(action);
      return Object.assign({}, state, { fetching_comments: true });

    case FETCH_COMMENTS_FULFILLED:
      console.log('fetch comments success');
      console.log(action);
      const comments = (1 == action.meta.page ?
        action.payload.results : state.comments.concat(action.payload.results)
      );
      const next_page = action.payload.next ? action.meta.page + 1 : null;
      return Object.assign({}, state, {
        fetching_comments: false,
        need_update: false,
        next_page,
        comments
      });

    case TOGGLE_FAVOR_OF_COMMENT_PENDING:
      console.log('toggling favor of the comment');
      return state;

    case TOGGLE_FAVOR_OF_COMMENT_FULFILLED:
      console.log('toggle favor of the comment success');
      return Object.assign({}, state, {
        comments: state.comments.map(item => {
          if (item.uuid == action.meta.comment_id) {
            switch (action.payload.result) {
              case "added":
                console.log("added");
                return Object.assign({}, item, {
                  rated: true,
                  rating: item.rating + 1,
                  latest_ratings: [{
                    avatar: action.meta.user_data.avatar,
                    user: action.meta.user_data.id
                  }].concat(item.latest_ratings)
                });

              case "deleted":
                console.log("deleted");
                return Object.assign({}, item, {
                  rated: false,
                  rating: item.rating - 1,
                  latest_ratings: item.latest_ratings.filter(rating_item => {
                    return rating_item.user != action.meta.user_data.id;
                  })
                });

              default:
                return item;
            }
          } else {
            return item;
          }
        })
      });

    case DELETE_COMMENT_PENDING:
      console.log('deleting the comment');
      return state;

    case DELETE_COMMENT_FULFILLED:
      console.log('delete the comment success');
      return Object.assign({}, state, { need_update: true });

    default:
      return state;
  }
}
