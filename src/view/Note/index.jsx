import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { setNoteToStore, fetchNoteByID, toggleFavorOfNote } from '../../actions/note';
import { deleteComment } from '../../actions/comment';
import Note from './Note';

const mapStateToProps = (state) => {
  const { cur_lesson, user_book_notes, cur_note, auth } = state;
  const { lesson_notes_all, lesson_notes_user } = cur_lesson;
  return {
    notes: lesson_notes_all.notes.concat(lesson_notes_user.notes, user_book_notes.notes),
    fetching_note: cur_note.fetching_note,
    note_need_update: cur_note.need_update,
    cur_note: cur_note.note,
    user_id: auth.user_info.id,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setNoteToStore,
      fetchNoteByID,
      toggleFavorOfNote,
      deleteComment,
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Note)
);
