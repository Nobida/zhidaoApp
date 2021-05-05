import React from 'react';
import NoteItem from '../../../common_component/NoteItem';
import PostFavor from '../PostFavor';

export default class ReplyList extends React.Component{
  constructor(props) {
    super(props);
  }

  onToggleFavor(replyID, rated) {
    const { actions, user_id, user_avatar } = this.props;
    const userData = {
      id: user_id,
      avatar: user_avatar,
    };
    actions.toggleFavorOfReply(replyID, rated, userData);
  }

  onClickItemDelete(replyToDelete) {
    this.props.onClickItemDelete(replyToDelete);
  }

  needForceUpdateReplys() {
    if (this.props.replys_need_update && !this.props.fetching_replys){
      return true;
    }
    return false;
  }

  needGetNextPageOfReplys() {
    const { reachBottom, next_replys_page, fetching_replys } = this.props;
    if (fetching_replys || !next_replys_page) {
      return false;
    }
    return reachBottom;
  }

  componentDidMount() {
    const { actions } = this.props;
    const postID = this.props.postID;
    actions.fetchPostReplys(postID, 1);
  }

  componentDidUpdate() {
    const { actions, next_replys_page } = this.props;
    const postID = this.props.postID;
    if (this.needForceUpdateReplys()) {
      console.log("need force update replys");
      actions.fetchPostReplys(postID, 1);
    } else if (this.needGetNextPageOfReplys()) {
      console.log("need get next page of replys");
      actions.fetchPostReplys(postID, next_replys_page);
    }
  }

  render(){
    return(
      <div className="post-replys">
        {this.props.replys.map(item => (
          <div key={item.uuid}>
            <NoteItem
              type="post"
              avatar={item.avatar}
              nickname={item.nickname}
              time={item.create_dt}
              content={item.contents}
              rated={item.rated}
              own={item.user == this.props.user_id}
              showFavor={true}
              onToggleFavor={this.onToggleFavor.bind(this, item.uuid, item.rated)}
              onDeleteClick={this.onClickItemDelete.bind(this, item.uuid)}
            />
            <PostFavor
              rating={ item.rating }
              latest_ratings={ item.latest_ratings }/>
          </div>
        ))}
      </div>
    )
  }
}