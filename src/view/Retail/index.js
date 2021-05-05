import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import {fetchCreditStatus} from "../../actions/retail";


import Retail from './Retail';

const mapStateToProps = (state) => {
  const { round_table,cur_course,retail, auth } = state;
  return {
    round_table,
    cur_course,
    fetching_credit_score: retail.fetching_credit_score,
    personal_credit_info: retail.personal_credit_info, 
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchCreditStatus,
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Retail)
);