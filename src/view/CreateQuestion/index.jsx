import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { createQuestion } from "../../actions/question";
import CreateQuestion from './CreateQuestion';

const mapStateToProps = (state) => {
  const { cur_selection, cur_post, cur_lesson, cur_course,auth } = state;
  return {
    cur_selection,
    cur_post,
    lesson_info: cur_lesson.lesson_info.lesson_info,
    cur_course,
    user_perm: auth.user_perm
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      createQuestion,
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateQuestion)
);
