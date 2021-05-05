import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import {fetchCourseByID,fetchCourseProducts, fetchLatestCourse} from "../../actions/course";
import {purchaseImmediately,checkDiscountByProduct,buyProducts} from "../../actions/product_order";
import {setAdSharePage,setDefaultSharePage} from "../../actions/wechat";
import {addProduceIntoCarts,clearCart} from "../../actions/cart";
import AdPage from './AdPage';

const mapStateToProps = (state) => {
  const { auth, cur_product_discount, cur_course, item_order,product_order } = state;
  return {
    user: auth.user_info,
    cur_product_discount,
    cur_course,
    item_order,
    product_order

  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchCourseByID,
      purchaseImmediately,
      checkDiscountByProduct,
      setAdSharePage,
      setDefaultSharePage,
      fetchCourseProducts,
      fetchLatestCourse,
      buyProducts
    }, dispatch)

  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdPage)
);
