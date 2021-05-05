import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import {getOrderList, deleteAnOrder, confirmOrderReceived} from "../../actions/product_order";
import OrderList from './OrderList';

const mapStateToProps = (state) => {
  const {orderlist,auth} = state;
  return {
    orderlist:orderlist.orderlist,
    apikey: auth.user_info.apikey,
    delete_success: orderlist.delete_success,
    confirm_success: orderlist.confirm_success,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getOrderList,
      deleteAnOrder,
      confirmOrderReceived,
    },dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderList)
);
