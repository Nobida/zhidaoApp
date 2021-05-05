import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { fetchCreditStatus, fetchRetailOrderItem } from "../../../actions/retail";

import RetailList from './RetailList';

const mapStateToProps = (state) => {

  const { retail, auth  } = state;
  return {
    fetching_credit_score: retail.fetching_credit_score,
    personal_credit_info: retail.personal_credit_info, 
    fetching_order_item: retail.fetching_order_item,
    order_item_list: retail.order_item_list, 
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
        fetchCreditStatus,
        fetchRetailOrderItem,
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RetailList)
);