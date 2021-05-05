import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { fetchLesson, clearLesson } from "../../actions/lesson";
import Memo from './Memo';

const mapStateToProps = (state) => {
  const { cur_lesson, auth } = state;
  return {
    lesson_info: cur_lesson.lesson_info.lesson_info,
    user_id: auth.user_info.id,
    invitation_code: auth.user_info.invitation_code
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchLesson,
      clearLesson,
    },dispatch)
  }; 
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Memo)
);
