import {connect} from 'react-redux';
import ReceiveGift from './ReceiveGift';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router';

import {receiveGift} from "../../actions/gift";

const mapStateToProps = (state) => {
  const {gift} = state;
  return {
    cur_received_gift: gift.cur_received_gift
  };
};

function mapDispatchToProps(dispatch) {
 return {actions: bindActionCreators({
   receiveGift
  }, dispatch)};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReceiveGift));
