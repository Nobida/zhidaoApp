import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { fetchProductDetail } from "../../actions/product";
import { addProduceIntoCarts} from "../../actions/cart";
import { purchaseById} from "../../actions/product_order";


import StoreItemDetail from './StoreItemDetail';

const mapStateToProps = (state) => {
  const { cur_product, carts, add_ret, item_order } = state;
  return {
    cur_product,
    carts: carts.carts,
    add_success: carts.add_success,
    add_ret: carts.add_ret,
    item_order: item_order.item_order,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchProductDetail,
      addProduceIntoCarts,
      purchaseById,
    },dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StoreItemDetail)
);
