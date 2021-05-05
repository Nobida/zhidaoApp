import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import {getCreatedOrderById, modifyOrderMessage} from "../../actions/product_order";
import PostOrder from './PostOrder';

const mapStateToProps = (state) => {
  const {created_order,auth} = state;
  return {
    created_order:created_order.created_order,
    modifying_order_msg: created_order.modifying_order_msg,
    apikey: auth.user_info.apikey,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getCreatedOrderById,
      modifyOrderMessage,
    },dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostOrder)
);
