import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchLessonQuestions, fetchLessonUserQuestions, toggleFavorOfQuestion } from "../../../actions/question";
import { setCurLessonQuestionProgress } from "../../../actions/lesson";
import QuestionList from './QuestionList';

const mapStateToProps = (state) => {
  const { cur_lesson, auth, cur_post } = state;
  return {
    user_id: auth.user_info.id,
    questions_all: cur_lesson.lesson_questions_all,
    questions_user: cur_lesson.lesson_questions_user,
    lesson_id: cur_lesson.lesson_info.lesson_info.id,
    lesson_question_progress: cur_lesson.lesson_question_progress,
    cur_post,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchLessonQuestions,
      fetchLessonUserQuestions,
      setCurLessonQuestionProgress,
      toggleFavorOfQuestion,
    }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);