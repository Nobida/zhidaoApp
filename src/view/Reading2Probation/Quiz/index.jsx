import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import {fetchLessonPage} from "../../../actions/lesson";
import { fetchQuizset, submitQuizAnswer, clearSubmitQuiz, submitQuizAnswerMock } from "../../../actions/quizset";
import Quiz from './Quiz';

const mapStateToProps = (state) => {
  const { cur_submit_quiz } = state;
  return {
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
      fetchLessonPage
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Quiz)
);
