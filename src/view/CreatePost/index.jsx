import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { createPost } from "../../actions/post";
import CreatePost from './CreatePost';

const mapStateToProps = (state) => {
  const { cur_post } = state;
  return {
    cur_post
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      createPost,
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreatePost)
);
