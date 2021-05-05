import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { fetchUserBookNotes, toggleFavorOfNote, deleteNote } from "../../actions/note";
import BookNoteList from './BookNoteList';

const mapStateToProps = (state) => {
  const { auth, user_book_notes, cur_delete } = state;
  return {
    user_id: auth.user_info.id,
    user_book_notes,
    cur_delete,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchUserBookNotes,
      toggleFavorOfNote,
      deleteNote,
    },dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookNoteList)
);
