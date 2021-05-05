import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { setCurLessonProgress } from "../../../actions/lesson";
import { setCurSelection } from "../../../actions/cur_selection";
import ReadingContent from './ReadingContent';


const mapStateToProps = (state) => {
  const { cur_lesson, cur_highlight, cur_selection, reading_settings, auth, user_agent } = state;
  return {
    background: cur_lesson.lesson_bg.background,
    text: cur_lesson.lesson_text.text,
    lecture: cur_lesson.lesson_lecture.lecture,
    lesson_progress: cur_lesson.lesson_progress,
    lesson_status: cur_lesson.lesson_info.lesson_info.status,
    notes_user: cur_lesson.lesson_notes_user.notes,
    day_num: cur_lesson.lesson_info.lesson_info.day_num,
    lesson_info: cur_lesson.lesson_info.lesson_info,
    qa: cur_lesson.lesson_qa.qa,
    highlight: cur_highlight,
    selection: cur_selection,
    reading_settings,
    apikey: auth.user_info.apikey,
    agent_type: user_agent.agent_type
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setCurLessonProgress,
      setCurSelection,
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReadingContent)
);
