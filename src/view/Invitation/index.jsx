import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Invitation from './Invitation';
import {withRouter} from 'react-router'
import { setDefaultSharePage,setAdSharePage } from "../../actions/wechat";
import {fetchCourseByID} from "../../actions/course";

const mapStateToProps = (state) => {
  const { auth,courses,cur_course } = state;
  return {
    user: auth.user_info,
    courses,
    cur_course
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setDefaultSharePage,
      setAdSharePage,
      fetchCourseByID
    }, dispatch)
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Invitation));
