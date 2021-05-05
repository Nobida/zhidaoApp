import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchQuizset } from "../../actions/quizset";
import { fetchLesson } from "../../actions/lesson";
import { createSharePage } from '../../actions/share';
import { setSharePage, setDefaultSharePage } from "../../actions/wechat";
import { fetchBooks } from "../../actions/book";
import { fetchCourseByID } from "../../actions/course";
import { fetchUserStat } from '../../actions/user';
import Punch from './Punch';

const mapStateToProps = (state) => {
  const { cur_lesson, quizset, cur_course, auth, user_stat, books } = state;
  return {
    quizes : quizset.quizes,
    answered: quizset.answered,
    lesson_info: cur_lesson.lesson_info.lesson_info,
    cur_course: cur_course.course,
    user_info: auth.user_info,
    user_stat: user_stat.stat,
    books,
  };
};
function mapDispatchToProps(dispatch) {
   return {
    actions: bindActionCreators({
    fetchQuizset,
    fetchLesson,
    createSharePage,
    setSharePage,
    setDefaultSharePage,
    fetchBooks,
    fetchCourseByID,
    fetchUserStat,
  }, dispatch)};
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Punch)
);
