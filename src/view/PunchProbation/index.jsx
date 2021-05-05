import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchQuizset } from "../../actions/quizset";
import { fetchLesson } from "../../actions/lesson";
import Punch from './Punch';

const mapStateToProps = (state) => {
  const { cur_lesson, quizset, cur_course, auth } = state;
  return {
    quizes : quizset.quizes,
    answered: quizset.answered,
    lesson_info: cur_lesson.lesson_info.lesson_info,
    course_name: cur_course.course.name,
    headimgurl: auth.user_info.headimgurl,
  };
};
function mapDispatchToProps(dispatch) {
   return {
    actions: bindActionCreators({
    fetchQuizset,
    fetchLesson
  }, dispatch)};
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Punch)
);
