import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { fetchAlertSetting,changeAlertSetting } from "../../actions/alert_setting";

import AlertSetting from './AlertSetting';

const mapStateToProps = (state) => {
  const { alert_setting, auth } = state;
  return {
    alert_setting: alert_setting.alert_setting,
    user_id: auth.user_info.id
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchAlertSetting, changeAlertSetting
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AlertSetting)
);
