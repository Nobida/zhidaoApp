import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { fetchQuizset, submitQuizAnswer, clearSubmitQuiz, submitQuizAnswerMock } from "../../actions/quizset";
import Quiz from './Quiz';

const mapStateToProps = (state) => {
  const { quizset, cur_submit_quiz } = state;
  return {
    quizes : quizset.quizes,
    fetching_quiz_set: quizset.fetching_quiz_set,
    cur_submit_quiz: cur_submit_quiz,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchQuizset,
      submitQuizAnswer,
      submitQuizAnswerMock,
      clearSubmitQuiz,
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Quiz)
);
