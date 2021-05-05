import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import {

  fetchRoundTableListByCourse,
  fetchRoundTableList
} from "../../actions/round_table";
import RoundTable from './RoundTable';

const mapStateToProps = (state) => {
  const { round_table,cur_course } = state;
  return {
    round_table,
    cur_course
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchRoundTableListByCourse,
      fetchRoundTableList
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RoundTable)
);
