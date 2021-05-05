import React from 'react';
import NoteItem from '../../../common_component/NoteItem';
import NoteFavor from '../NoteFavor';

export default class CommentList extends React.Component{
  constructor(props) {
    super(props);
  }

  onToggleFavor(commentID, rated) {
    const { actions, user_id, user_avatar } = this.props;
    const userData = {
      id: user_id,
      avatar: user_avatar,
    };
    actions.toggleFavorOfComment(commentID, rated, userData);
  }

  onClickItemDelete(commentToDelete) {
    this.props.onClickItemDelete(commentToDelete);
  }

  needForceUpdateComments() {
    if (this.props.comments_need_update && !this.props.fetching_comments){
      return true;
    }
    return false;
  }

  needGetNextPageOfComments() {
    const { reachBottom, next_comments_page, fetching_comments } = this.props;
    if (fetching_comments || !next_comments_page) {
      return false;
    }
    return reachBottom;
  }

  componentDidMount() {
    const { actions } = this.props;
    const noteID = this.props.noteID;
    actions.fetchNoteComments(noteID, 1);
  }

  componentDidUpdate() {
    const { actions, next_comments_page } = this.props;
    const noteID = this.props.noteID;
    if (this.needForceUpdateComments()) {
      console.log("need force update comments");
      actions.fetchNoteComments(noteID, 1);
    } else if (this.needGetNextPageOfComments()) {
      console.log("need get next page of comments");
      actions.fetchNoteComments(noteID, next_comments_page);
    }
  }

  render(){
    return(
      <div className="note-comments">
        {this.props.comments.map(item => (
          <div key={item.uuid}>
            <NoteItem
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
            <NoteFavor
              rating={ item.rating }
              latest_ratings={ item.latest_ratings }/>
          </div>
        ))}
      </div>
    )
  }
}