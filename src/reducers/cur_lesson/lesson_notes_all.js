import {
  FETCH_LESSON_NOTES_PENDING,
  FETCH_LESSON_NOTES_FULFILLED,
  FETCH_LESSON_NOTES_REJECTED,
  POST_NOTE_FULFILLED,
  DELETE_NOTE_FULFILLED,
  TOGGLE_FAVOR_OF_NOTE_FULFILLED,
} from '../../actions/note';
import { CLEAR_LESSON } from "../../actions/lesson";
import { getItemIndexInList } from '../../utils';


const initialState = {
  fetching_notes: false,
  next_url: true,
  notes:[]
};
export default function lesson_notes_all(state = initialState, action = {}) {
  switch (action.type) {

    case FETCH_LESSON_NOTES_PENDING:
      console.log('fetching lesson notes');
      console.log(action);
      return Object.assign({}, state, { fetching_notes: true });

    case FETCH_LESSON_NOTES_FULFILLED:
      console.log('fetch lesson notes success');
      console.log(action);
      const notes_get = (action.meta.firstPage ?
        action.payload.results : state.notes.concat(action.payload.results)
      );
      return Object.assign({}, state, {
        fetching_notes: false,
        next_url: action.payload.next,
        notes: notes_get,
      });

    case POST_NOTE_FULFILLED:
      console.log('post note success');
      console.log(action);
      let notes_add = state.notes;
      if (state.notes.length && (state.notes[0].lesson_page.split('/')[0] == action.payload.lesson_page.split('/')[0])) {
        console.log('add note in lesson notes');
        notes_add = [action.payload].concat(state.notes);
      }
      return Object.assign({}, state, {
        notes: notes_add,
      });

    case DELETE_NOTE_FULFILLED:
      console.log('delete note success');
      console.log(action);
      const notes_del = state.notes.filter(item => {
        if (action.meta.noteID == item.uuid) {
          console.log('delete note in lesson notes');
          return false;
        }
        return true;
      });
      return Object.assign({}, state, {
        notes: notes_del,
      });

    case TOGGLE_FAVOR_OF_NOTE_FULFILLED:
      console.log('toggle favor of note success');
      console.log(action);
      if ("no_action" == action.payload.results) {
        return state;
      }
      const rateNoteId = getItemIndexInList(action.meta.noteID, state.notes);
      if (rateNoteId != -1) {
        console.log('toggle favor in lesson notes');
        const rated = ("added" == action.payload.result ? true : false);
        let notes = state.notes.map(function(d){ return d });
        notes[rateNoteId].rated = rated;
        notes[rateNoteId].rating += (rated ? 1 : -1);
        return Object.assign({}, state, {
          notes
        });
      } else {
        return state;
      }

    case CLEAR_LESSON:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
}
