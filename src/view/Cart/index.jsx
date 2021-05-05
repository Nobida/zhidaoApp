import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { fetchCarts, deleteProductFromCart } from "../../actions/cart";
import {colletOrder} from "../../actions/product_order";
import Cart from './Cart';

const mapStateToProps = (state) => {
  const {carts, collect_order_ret} = state;
  return {
    carts: carts.carts,
    delete_success: carts.delete_success,
    deleting_item:carts.deleting_item,
    collect_order_ret: collect_order_ret,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchCarts,
      deleteProductFromCart,
      colletOrder,
    },dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Cart)
);
