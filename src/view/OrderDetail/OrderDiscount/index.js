import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import {  fetchOrderDetailRecord } from "../../../actions/order";
import OrderDiscount from './OrderDiscount';

const mapStateToProps = (state) => {
  const { order, auth  } = state;
  return {
    order_detail_record: order.order_detail_record,

  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchOrderDetailRecord

    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderDiscount)
);


