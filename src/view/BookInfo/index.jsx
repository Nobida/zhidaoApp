import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { fetchBookDetail } from "../../actions/book";
import BookInfo from './BookInfo';

const mapStateToProps = (state) => {
  const { cur_book } = state;
  return {
    cur_book,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchBookDetail,
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookInfo)
);
