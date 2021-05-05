import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { setQuestionToStore, fetchQuestionByID, toggleFavorOfQuestion } from '../../actions/question';
import { deleteAnswer } from '../../actions/answer';
import Question from './Question';

const mapStateToProps = (state) => {
  const { cur_lesson, user_questions, cur_question, auth } = state;
  const { lesson_questions_all, lesson_questions_thinking } = cur_lesson;
  return {
    questions: lesson_questions_all.questions.concat(lesson_questions_thinking.questions, user_questions.questions),
    fetching_question: cur_question.fetching_question,
    question_need_update: cur_question.need_update,
    cur_question: cur_question.question,
    user_id: auth.user_info.id,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setQuestionToStore,
      fetchQuestionByID,
      toggleFavorOfQuestion,
      deleteAnswer,
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Question)
);
