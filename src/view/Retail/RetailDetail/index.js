import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { fetchCreditOrderRecord } from "../../../actions/retail";

import RetailDetail from './RetailDetail';

const mapStateToProps = (state) => {
  const { retail, auth  } = state;
  return {
    credit_order_record: retail.credit_order_record

  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchCreditOrderRecord

    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RetailDetail)
);


