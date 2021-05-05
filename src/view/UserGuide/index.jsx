import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserStat } from "../../actions/user";
import { withRouter } from 'react-router';
import { fetchCourseByID, fetchCourseList} from '../../actions/course'
import UserGuide from './UserGuide';

const mapStateToProps = (state) => {
  const { courses,cur_course,auth } = state;
  const status = ['all', 'registerable']
  return {
    courses, 
    cur_course:cur_course.course,
    studentID: auth.user_info.id,
    status: status
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchUserStat,
      fetchCourseByID,
      fetchCourseList
    },dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserGuide)
);
