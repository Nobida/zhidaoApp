import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserQuestionList, toggleFavorOfQuestion, deleteQuestion } from "../../actions/question";
import UserQuestionList from './UserQuestionList';

const mapStateToProps = (state) => {
  const { auth, user_questions, cur_delete } = state;
  return {
    user_id: auth.user_info.id,
    user_questions: user_questions,
    cur_delete: cur_delete,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchUserQuestionList,
      toggleFavorOfQuestion,
      deleteQuestion,
    },dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserQuestionList);
