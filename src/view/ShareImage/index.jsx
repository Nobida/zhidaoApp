import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { fetchLesson, clearLesson } from "../../actions/lesson";
import ShareImage from './ShareImage';

const mapStateToProps = (state) => {
  const { cur_lesson } = state;
  return {
    lesson_info: cur_lesson.lesson_info.lesson_info,
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
  connect(mapStateToProps, mapDispatchToProps)(ShareImage)
);
