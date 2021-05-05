import {
  SET_CUR_SELECTION,
} from '../actions/cur_selection';

const initialState = {
  contents: null,
  pre_contents: null,
  post_contents: null,
  offset: null,
  anchor_offset: null,
  page_offset: null,
  uri_anchor: null,
  page_type:null
};
export default function cur_selection(state = initialState, action = {}) {
  switch (action.type) {

    case SET_CUR_SELECTION:
      console.log('set cur selection:');
      console.log(action.selection);
      return Object.assign({}, state, {
        contents: action.selection.contents,
        pre_contents: action.selection.pre_contents,
        post_contents: action.selection.post_contents,
        offset: action.selection.offset,
        anchor_offset: action.selection.anchor_offset,
        page_offset: action.selection.page_offset,
        uri_anchor: action.selection.uri_anchor,
        page_type: action.selection.page_type
      });

    default:
      return state;
  }
}