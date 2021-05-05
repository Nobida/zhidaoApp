import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReplyList from './ReplyList';
import { deleteReply, fetchPostReplys, toggleFavorOfReply } from '../../../actions/reply';

const mapStateToProps = (state) => {
  const { replys, auth } = state;
  return {
    replys: replys.replys,
    fetching_replys: replys.fetching_replys,
    next_replys_page: replys.next_page,
    replys_need_update: replys.need_update,
    user_id: auth.user_info.id,
    user_avatar: auth.user_info.headimgurl,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      deleteReply,
      fetchPostReplys,
      toggleFavorOfReply,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyList);
