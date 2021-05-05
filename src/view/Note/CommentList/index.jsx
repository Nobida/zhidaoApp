import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CommentList from './CommentList';
import { deleteComment, fetchNoteComments, toggleFavorOfComment } from '../../../actions/comment';

const mapStateToProps = (state) => {
  const { comments, auth } = state;
  return {
    comments: comments.comments,
    fetching_comments: comments.fetching_comments,
    next_comments_page: comments.next_page,
    comments_need_update: comments.need_update,
    user_id: auth.user_info.id,
    user_avatar: auth.user_info.headimgurl,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      deleteComment,
      fetchNoteComments,
      toggleFavorOfComment,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
