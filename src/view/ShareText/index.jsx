import {connect} from 'react-redux';
import ShareText from './ShareText';

const mapStateToProps = (state) => {
  const {cur_selection,cur_lesson,auth} = state;
    return {
        cur_selection,
        lesson_info: cur_lesson.lesson_info.lesson_info,
        nickname: auth.user_info.nickname
    };
};
function mapDispatchToProps(dispatch) {
  return { };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareText);
