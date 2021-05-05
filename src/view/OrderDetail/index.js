import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { fetchOrderRecord, fetchOrderDetailRecord, ShowPersonInfo } from "../../actions/order";
import OrderDetail from './OrderDetail';

const mapStateToProps = (state) => {
  const { order, auth  } = state;
  return {
    credit_order_record: order.credit_order_record,
    items: order.items

  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchOrderRecord,
      fetchOrderDetailRecord,

    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
);


