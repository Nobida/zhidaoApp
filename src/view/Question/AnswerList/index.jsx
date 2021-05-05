import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AnswerList from './AnswerList';
import { deleteAnswer, fetchQuestionAnswers, toggleFavorOfAnswer } from '../../../actions/answer';

const mapStateToProps = (state) => {
  const { answers, auth } = state;
  return {
    answers: answers.answers,
    fetching_answers: answers.fetching_answers,
    next_answers_page: answers.next_page,
    answers_need_update: answers.need_update,
    user_id: auth.user_info.id,
    user_avatar: auth.user_info.headimgurl,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      deleteAnswer,
      fetchQuestionAnswers,
      toggleFavorOfAnswer,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerList);
