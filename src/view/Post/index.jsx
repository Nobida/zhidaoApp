import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { fetchPostByID, toggleFavorOfPost } from '../../actions/post';
import { deleteReply } from '../../actions/reply';
import Post from './Post';

const mapStateToProps = (state) => {
  const { cur_post_item, auth } = state;
  return {
    fetching_post: cur_post_item.fetching_post,
    post_need_update: cur_post_item.need_update,
    cur_post_item: cur_post_item.post,
    user_id: auth.user_info.id,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchPostByID,
      toggleFavorOfPost,
      deleteReply,
    }, dispatch)
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Post)
);
