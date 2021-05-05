import {connect} from 'react-redux';
import GiftList from './GiftList';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {fetchGiftList,setCurGift,deleteGift} from "../../../actions/gift";

const mapStateToProps = (state) => {
  const {gift,auth} = state;
  return {
    gifts: gift.gifts,
    cur_gift: gift.cur_gift.cur_gift,
    cur_delete_gift: gift.cur_delete_gift,
    apikey: auth.user_info.apikey
  };
};
function mapDispatchToProps(dispatch) {
   return {
    actions: bindActionCreators({
      fetchGiftList,
      setCurGift,
      deleteGift
  }, dispatch)};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GiftList));
