import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserStat } from "../../actions/user";
import User from './User';

const mapStateToProps = (state) => {
  const { auth, user_stat } = state;
  return {
    user_info: auth.user_info,
    user_stat: user_stat.stat,
    if_is_retail: auth.user_info.invitation_use_credit
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchUserStat,
    },dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(User);
