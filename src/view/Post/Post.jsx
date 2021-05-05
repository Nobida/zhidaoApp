import React from 'react';
import NoteItem from '../../common_component/NoteItem';
import PostFavor from './PostFavor';
import PostBottom from './PostBottom';
import ReplyList from './ReplyList';
import Loadings from '../../common_component/Loadings';
import { Drawer } from "../../common_component/Drawer";
import Button from "../../common_component/Button";
import './style.scss';

export default class Post extends React.Component {

  constructor(props){
    super(props);
    this.state={
      showReplyDrawer: false,
      reachBottom: false,
      showDeleteDrawer: false,
      replyToDelete: null,
    }
  }

  showReplyDrawer(){
    this.setState({
      showReplyDrawer: true,
      showDeleteDrawer: false,
    })
  }

  hideReplyDrawer(){
    this.setState({showReplyDrawer: false})
  }

  showDeleteDrawer() {
    this.setState({
      showDeleteDrawer: true,
      showReplyDrawer: false,
    })
  }

  hideDeleteDrawer() {
    this.setState({showDeleteDrawer: false})
  }

  toggleFavorOfPost(rated) {
    const { actions } = this.props;
    const postID = this.props.match.params.id;
    actions.toggleFavorOfPost(postID, rated);
  }

  needForceUpdatePost() {
    if (this.props.post_need_update && !this.props.fetching_post){
      console.log("need force update post");
      return true;
    }
    return false;
  }

  handleReplyListScroll(e) {
    const clientHeight = e.target.clientHeight; // 可视区域
    const scrollTop = e.target.scrollTop;       // 滚动高度
    const scrollHeight = e.target.scrollHeight; // 总高度
    const reachBottom = (clientHeight + scrollTop == scrollHeight);
    if (reachBottom != this.state.reachBottom) {
      console.log("reachBottom: "+reachBottom);
      this.setState({ reachBottom });
    }q
  }

  onClickItemDelete(replyToDelete) {
    console.log("replyToDelete: " + replyToDelete);
    this.setState({ replyToDelete });
    this.showDeleteDrawer();
  }

  handlePostDelete() {
    const postID = this.props.match.params.id;
    const { actions } = this.props;
    actions.deleteReply(this.state.replyToDelete, postID);
    this.hideDeleteDrawer();
  }

  componentDidMount() {
    console.log('Post did mount');
    const { actions } = this.props;
    const roundTableId = this.props.match.params.round_table_id;
    const postID = this.props.match.params.id;
    actions.fetchPostByID(postID,roundTableId);
  }

  componentDidUpdate() {
    console.log('Post did update');
    const { actions } = this.props;
    const roundTableId = this.props.match.params.round_table_id;
    const postID = this.props.match.params.id;
    if (this.needForceUpdatePost()) {
      actions.fetchPostByID(postID,roundTableId);
    }
  }

  render() {
    console.log('Post render');
    const postID = this.props.match.params.id;
    if (this.props.cur_post_item.uuid != postID) {
      return(
        <Loadings show={true}/>
      );
    }
    const post = this.props.cur_post_item;
    return(
      <div className="post" onScroll={this.handleReplyListScroll.bind(this)}>
        <NoteItem
          type="post"
          avatar={ post.avatar }
          nickname={ post.nickname }
          time={ post.create_dt }
          content={ post.contents }
          // quote={ post.selection.contents }
          own={ false && (post.user == this.props.user_id) }
          showFavor={ false }/>
        <PostFavor
          rating={ post.rating }
          latest_ratings={ post.latest_ratings }/>
        <ReplyList
          postID={postID}
          onClickItemDelete={this.onClickItemDelete.bind(this)}
          reachBottom={this.state.reachBottom} />
        <PostBottom
          rated={post.rated}
          post={postID}
          replyDrawerShow={this.state.showReplyDrawer}
          toggleFavorOfPost={this.toggleFavorOfPost.bind(this, post.rated)}
          showReplyDrawer={this.showReplyDrawer.bind(this)}
          hideReplyDrawer={this.hideReplyDrawer.bind(this)} />
        <Drawer show={this.state.showDeleteDrawer}
          className="delete-post-container"
          hideOverlay={true}
          pos="bottom"
          showClose
          onRequestClose={this.hideDeleteDrawer.bind(this)}>
          <div className="delete-content">
            <p>确定要删除吗</p>
            <div className="button-tools">
              <Button onClick={this.handlePostDelete.bind(this)}>确定</Button>
              <Button onClick={this.hideDeleteDrawer.bind(this)} type='ghost'>取消</Button>
            </div>
          </div>
        </Drawer>
      </div>
    )
  }
}
