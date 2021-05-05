import {
  SET_CUR_HIGHLIGHT,
  CLEAR_CUR_HIGHLIGHT,
} from '../actions/cur_highlight';

const initialState = {
  "uuid":null,
  "type": null,
  "title": null,
  "user": null,
  "nickname": null,
  "avatar": null,
  "public": null,
  "rating": null,
  'rated':null,
  "anchor": null,
  "book": null,
  "lesson_page": null,
  "selection": {},
  "contents": null,
  "create_dt": null,
  "update_dt": null,
  "latest_ratings": []
};
export default function cur_highlight(state = initialState, action = {}) {
  switch (action.type) {

    case SET_CUR_HIGHLIGHT:
      console.log('set cur highlight:');
      console.log(action.highlight);
      return Object.assign({}, state, action.highlight);

    case CLEAR_CUR_HIGHLIGHT:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
}