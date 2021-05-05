import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchCourseList } from "../../actions/course";
import { fetchUserPerm } from "../../actions/auth";
import { fetchToday } from "../../actions/today";
import { fetchSignature, setDefaultSharePage } from "../../actions/wechat";
import App from './App';

const mapStateToProps = (state) => {
  const { courses, today, wechat, auth, user_agent } = state;
  return {
      courses,
      today,
      auth,
      sharePage: wechat.sharePage,
      agent_type: user_agent.agent_type
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchSignature,
      setDefaultSharePage,
      fetchCourseList,
      fetchToday,
      fetchUserPerm
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
