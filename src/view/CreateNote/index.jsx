import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { createNote } from "../../actions/note";
import CreateNote from './CreateNote';

const mapStateToProps = (state) => {
  const { cur_selection, cur_post, cur_lesson } = state;
  return {
    cur_selection,
    cur_post,
    lesson_info: cur_lesson.lesson_info.lesson_info,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      createNote,
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateNote)
);
