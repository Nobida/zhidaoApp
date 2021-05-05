import { connect } from 'react-redux';
import StudentCard from './StudentCard';

const mapStateToProps = (state) => {
  const { auth, courses } = state;
  return {
    nickname: auth.user_info.nickname,
    id: auth.user_info.id,
    courses: courses.courses
  };
};
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentCard);
