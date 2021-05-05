import {connect} from 'react-redux';
import Gift from './Gift';
import {fetchQuizset} from "../../actions/quizset";
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {fetchLesson,fetchLessons} from "../../actions/lesson";
import {createSharePage} from '../../actions/share';
import {fetchGiftList,createGift} from "../../actions/gift";

const mapStateToProps = (state) => {
  const {gift,auth} = state;
  return {
    apikey: auth.user_info.apikey,
    gifts: gift.gifts,
    cur_post_gift: gift.cur_post_gift
  };
};
function mapDispatchToProps(dispatch) {
   return {
    actions: bindActionCreators({
      fetchGiftList,
      createGift

  }, dispatch)};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Gift));
