import {connect} from 'react-redux';
import GiftImage from './GiftImage';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {fetchCurGift} from "../../actions/gift";
import {fetchProductDetail} from "../../actions/product";

const mapStateToProps = (state) => {
  const {gift,auth,cur_product} = state;
  return {
    apikey: auth.user_info.apikey,
    cur_gift: gift.cur_gift,
    cur_product
  };
};
function mapDispatchToProps(dispatch) {
    return {
    actions: bindActionCreators({
      fetchCurGift,
      fetchProductDetail
  }, dispatch)};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GiftImage));
