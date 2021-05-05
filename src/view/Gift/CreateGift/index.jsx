import {connect} from 'react-redux';
import CreateGift from './CreateGift';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {fetchGiftList,createGift,fetchProductsCanBeUsedAsGift} from "../../../actions/gift";
import {fetchCurCoupon} from "../../../actions/coupon";

const mapStateToProps = (state) => {
  const {gift,auth} = state;
  return {
    apikey: auth.user_info.apikey,
    gifts: gift.gifts,
    gift_products: gift.gift_products,
    cur_post_gift: gift.cur_post_gift,
    cur_coupon: gift.cur_coupon
  };
};
function mapDispatchToProps(dispatch) {
   return {
    actions: bindActionCreators({
      fetchGiftList,
      createGift,
      fetchCurCoupon,
      fetchProductsCanBeUsedAsGift
  }, dispatch)};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateGift));
