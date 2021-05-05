import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchLessonNotes, fetchLessonUserNotes, toggleFavorOfNote } from "../../../actions/note";
import { setCurLessonNoteProgress } from "../../../actions/lesson";
import NoteList from './NoteList';

const mapStateToProps = (state) => {
  const { cur_lesson, auth, cur_post } = state;
  return {
    user_id: auth.user_info.id,
    notes_all: cur_lesson.lesson_notes_all,
    notes_user: cur_lesson.lesson_notes_user,
    lesson_id: cur_lesson.lesson_info.lesson_info.id,
    lesson_note_progress: cur_lesson.lesson_note_progress,
    cur_post,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchLessonNotes,
      fetchLessonUserNotes,
      setCurLessonNoteProgress,
      toggleFavorOfNote,
    }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(NoteList);