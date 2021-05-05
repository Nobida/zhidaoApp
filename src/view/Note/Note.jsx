import React from 'react';
import NoteItem from '../../common_component/NoteItem';
import NoteFavor from './NoteFavor';
import NoteBottom from './NoteBottom';
import CommentList from './CommentList';
import Loadings from '../../common_component/Loadings';
import { Drawer } from "../../common_component/Drawer";
import Button from "../../common_component/Button";
import './style.scss';

export default class Note extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showCommentDrawer: false,
      reachBottom: false,
      showDeleteDrawer: false,
      commentToDelete: null,
    }
  }

  showCommentDrawer(){
    this.setState({
      showCommentDrawer: true,
      showDeleteDrawer: false,
    })
  }

  hideCommentDrawer(){
    this.setState({showCommentDrawer: false})
  }

  showDeleteDrawer() {
    this.setState({
      showDeleteDrawer: true,
      showCommentDrawer: false,
    })
  }

  hideDeleteDrawer() {
    this.setState({showDeleteDrawer: false})
  }

  getNoteFromNotes(noteID) {
    const { notes } = this.props;
    for (const note of notes) {
      if (note.uuid == noteID) {
        return note;
      }
    }
    return null;
  }

  toggleFavorOfNote(rated) {
    const { actions } = this.props;
    const noteID = this.props.match.params.id;
    actions.toggleFavorOfNote(noteID, rated);
  }

  needForceUpdateNote() {
    if (this.props.note_need_update && !this.props.fetching_note){
      console.log("need force update note");
      return true;
    }
    return false;
  }

  needUpdateNote() {
    const { fetching_note, cur_note, match } = this.props;
    if (fetching_note || (cur_note.uuid == match.params.id)) {
      return false;
    }
    console.log("need update note");
    return true;
  }

  handleCommentListScroll(e) {
    const clientHeight = e.target.clientHeight; // 可视区域
    const scrollTop = e.target.scrollTop;       // 滚动高度
    const scrollHeight = e.target.scrollHeight; // 总高度
    const reachBottom = (clientHeight + scrollTop == scrollHeight);
    if (reachBottom != this.state.reachBottom) {
      console.log("reachBottom: "+reachBottom);
      this.setState({ reachBottom });
    }
  }

  onClickItemDelete(commentToDelete) {
    console.log("commentToDelete: " + commentToDelete);
    this.setState({ commentToDelete });
    this.showDeleteDrawer();
  }

  handleNoteDelete() {
    const noteID = this.props.match.params.id;
    const { actions } = this.props;
    actions.deleteComment(this.state.commentToDelete, noteID);
    this.hideDeleteDrawer();
  }

  componentDidMount() {
    console.log('Note did mount');
    const { actions } = this.props;
    const noteID = this.props.match.params.id;
    if (this.needForceUpdateNote()) {
      actions.fetchNoteByID(noteID);
    } else if (this.needUpdateNote()) {
      let note = this.getNoteFromNotes(noteID);
      if (note) {
        console.log("get note from notes success");
        actions.setNoteToStore(note);
      } else {
        actions.fetchNoteByID(noteID);
      }
    }
  }

  componentDidUpdate() {
    console.log('Note did update');
    const { actions } = this.props;
    const noteID = this.props.match.params.id;
    if (this.needForceUpdateNote()) {
      actions.fetchNoteByID(noteID);
    }
  }

  render() {
    console.log('Note render');
    const noteID = this.props.match.params.id;
    if (this.props.cur_note.uuid != noteID) {
      return(
        <Loadings show={true}/>
      );
    }
    const note = this.props.cur_note;
    return(
      <div className="note" onScroll={this.handleCommentListScroll.bind(this)}>
        <NoteItem
          avatar={ note.avatar }
          nickname={ note.nickname }
          time={ note.create_dt }
          content={ note.contents }
          quote={ note.selection.contents }
          own={ false && (note.user == this.props.user_id) }
          showFavor={ false }/>
        <NoteFavor
          rating={ note.rating }
          latest_ratings={ note.latest_ratings }/>
        <CommentList
          noteID={noteID}
          onClickItemDelete={this.onClickItemDelete.bind(this)}
          reachBottom={this.state.reachBottom} />
        <NoteBottom
          rated={note.rated}
          note={noteID}
          commentDrawerShow={this.state.showCommentDrawer}
          toggleFavorOfNote={this.toggleFavorOfNote.bind(this, note.rated)}
          showCommentDrawer={this.showCommentDrawer.bind(this)}
          hideCommentDrawer={this.hideCommentDrawer.bind(this)} />
        <Drawer show={this.state.showDeleteDrawer}
          className="delete-note-container"
          hideOverlay={true}
          pos="bottom"
          showClose
          onRequestClose={this.hideDeleteDrawer.bind(this)}>
          <div className="delete-content">
            <p>确定要删除吗</p>
            <div className="button-tools">
              <Button onClick={this.handleNoteDelete.bind(this)}>确定</Button>
              <Button onClick={this.hideDeleteDrawer.bind(this)} type='ghost'>取消</Button>
            </div>
          </div>
        </Drawer>
      </div>
    )
  }
}
