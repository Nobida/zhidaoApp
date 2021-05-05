import {
  SET_NOTE_TO_STORE,
  FETCH_NOTE_BY_ID_PENDING,
  FETCH_NOTE_BY_ID_FULFILLED,
  FETCH_NOTE_BY_ID_REJECTED,
  TOGGLE_FAVOR_OF_NOTE_PENDING,
  TOGGLE_FAVOR_OF_NOTE_FULFILLED,
  TOGGLE_FAVOR_OF_NOTE_REJECTED
} from '../actions/note';

const initialState = {
  fetching_note: false,
  need_update: false,
  note: {}
};
export default function cur_note(state = initialState, action = {}) {
  switch (action.type) {

    case SET_NOTE_TO_STORE:
      return Object.assign({}, state, {
        note: action.payload
      });

    case FETCH_NOTE_BY_ID_PENDING:
      console.log('fetching note by id');
      return Object.assign({}, state, { fetching_note: true });

    case FETCH_NOTE_BY_ID_FULFILLED:
      console.log('fetch note by id success');
      return Object.assign({}, state, {
        fetching_note: false,
        need_update: false,
        note: action.payload
      });

    case TOGGLE_FAVOR_OF_NOTE_PENDING:
      console.log('toggling favor of note');
      return state;

    case TOGGLE_FAVOR_OF_NOTE_FULFILLED:
      console.log('toggle favor of note success');
      console.log(action);
      if ("no_action" == action.payload.results || state.note.uuid != action.meta.noteID) {
        console.log('no action');
        return state;
      }
      console.log('toggle favor in cur_note');
      console.log(action);
      const rated = ("added" == action.payload.result ? true : false);
      const note = Object.assign({}, state.note, { rated });
      return Object.assign({}, state, {
        note,
        need_update: true
      });

    default:
      return state;
  }
}
