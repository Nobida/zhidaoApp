import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { setCurSelection } from "../../actions/cur_selection";
import { setCurHighlight, clearCurHighlight } from "../../actions/cur_highlight";
import { deleteNote, clearCurPost } from "../../actions/note";
import { deleteQuestion } from "../../actions/question";
import { fetchCourseByID } from "../../actions/course";
import {
  fetchLesson,
  fetchLessonBG,
  fetchLessonLecture,
  fetchLessonText,
  fetchLessonQA,
  clearLesson,
} from "../../actions/lesson";
import {
  fetchLessonUserNotes
} from "../../actions/note";
import Reading from './Reading';

const mapStateToProps = (state) => {
  const { auth, reading_settings, cur_selection, cur_lesson, cur_highlight, cur_delete, cur_course, cur_post,user_agent } = state;
  return {
    agent_type: user_agent.agent_type,
    user_id: auth.user_info.id,
    reading_settings,
    cur_selection,
    cur_lesson,
    highlight: cur_highlight,
    cur_delete,
    cur_post,
    cur_course,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchCourseByID,
      setCurSelection,
      fetchLesson,
      fetchLessonBG,
      fetchLessonLecture,
      fetchLessonText,
      fetchLessonQA,
      fetchLessonUserNotes,
      clearLesson,
      setCurHighlight,
      clearCurHighlight,
      deleteNote,
      deleteQuestion,
      clearCurPost,
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Reading)
);
