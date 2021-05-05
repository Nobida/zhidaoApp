import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import {
  fetchLesson,
  clearLesson,
  fetchLessonQuizStatus
} from "../../actions/lesson";
import {
  fetchUserStat
} from "../../actions/user";
import { createSharePage } from '../../actions/share';
import { setSharePage, setDefaultSharePage } from "../../actions/wechat";
import ReadingCard from './ReadingCard';

const mapStateToProps = (state) => {
  const { cur_lesson, cur_course } = state;
  return {
    cur_course: cur_course.course,
    lesson_info: cur_lesson.lesson_info.lesson_info,
    lesson_quiz_status: cur_lesson.lesson_quiz_status.lesson_quiz_status
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchLesson,
      fetchLessonQuizStatus,
      clearLesson,
      createSharePage,
      setSharePage,
      setDefaultSharePage,
      fetchUserStat
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReadingCard)
);
