import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { fetchCreditPayRecord } from "../../../actions/retail";
import SettleList from './SettleList';

const mapStateToProps = (state) => {
  const { retail } = state;
  return {
    credit_pay_record: retail.credit_pay_record

  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
        fetchCreditPayRecord,
    
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SettleList)
);
