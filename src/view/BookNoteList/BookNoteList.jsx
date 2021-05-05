import React from 'react';
import ReactDOM from 'react-dom';
import { NoteListItem } from "../../common_component/NoteList";
import { Drawer, DrawerContent } from "../../common_component/Drawer";
import ConfirmButtons from '../../common_component/MediaItem/ConfirmButtons';
import Loadings from '../../common_component/Loadings';
import Toast from '../../common_component/Toast';
import Empty from '../../common_component/Empty';
import './style.scss';

export default class BookNoteList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDeleteDrawer: false,
      showToast: false,
      toastMsg: '',
      toastStatus: '',
      deleteNoteId: null
    }
  }

  showDeleteDrawer(){
    this.setState({ showDeleteDrawer: true })
  }

  hideDeleteDrawer(){
    this.setState({ showDeleteDrawer: false })
  }

  handleDeleteClick(item){
    this.showDeleteDrawer();
    this.setState({ deleteNoteId: item.uuid });
  }

  toggleFavorClick(item){
    const { actions } = this.props;
    actions.toggleFavorOfNote(item.uuid,item.rated);
  }

  handleNoteDelete(){
    const { actions } = this.props;
    const { deleteNoteId } = this.state;
    actions.deleteNote(deleteNoteId);
    this.hideDeleteDrawer();
    this.setState({
      showToast   : true,
      toastMsg    : '正在删除..',
      toastStatus : 'loading'
    })
  };

  handleListScroll(e) {
    const { actions, user_id, user_book_notes } = this.props;
    const book_id = this.props.match.params.book_id;
    if (user_book_notes.fetching_notes || !user_book_notes.next_url) {
      return;
    }
    const clientHeight = e.target.clientHeight; // 可视区域
    const scrollTop = e.target.scrollTop;       // 滚动高度
    const scrollHeight = e.target.scrollHeight; // 总高度
    const loadingView = ReactDOM.findDOMNode(this.refs.loadingView);
    const GAP = $(loadingView).height() * 2;
    if (clientHeight + scrollTop >= scrollHeight - GAP) {
      console.log("reach bottom");
      actions.fetchUserBookNotes(user_id, book_id, user_book_notes.next_url);
    }
  }

  getNoteList(){
    return this.props.user_book_notes.notes.map(item => {
      let contents = item.contents;
      if (contents.length > 60) {
        contents = contents.substring(0, 60) + '...';
      }
      return (
        <NoteListItem
          key={item.uuid}
          avatar={item.avatar}
          nickname={item.nickname}
          contents={contents}
          selection={item.selection}
          create_dt={item.create_dt}
          id={item.uuid}
          own={item.user == this.props.user_id}
        //  onQuoteClick={this.onQuoteClick.bind(this,item)}
          onDeleteClick={this.handleDeleteClick.bind(this,item)}
          onRatingClick={this.toggleFavorClick.bind(this,item)}
          rated={item.rated}
          rating={item.rating}
          showFavor={true}
        />
      );
    });
  }

  componentDidMount(){
    console.log('BookNoteList did mount');
    const { actions, user_id } = this.props;
    const book_id = this.props.match.params.book_id;
    if (book_id && user_id) {
      actions.fetchUserBookNotes(user_id, book_id);
    }
  }

  componentWillReceiveProps(nextProps){
    console.log('BookNoteList will receive props');
    const { actions, user_id } = this.props;
    if (nextProps.cur_delete.success_info && this.props.cur_delete.deleting){
      this.setState({
        showToast   : true,
        toastMsg    : '删除成功',
        toastStatus : 'finish'
      });
    }
  }

  render(){
    console.log('BookNoteList render');
    const { user_book_notes } = this.props;
    const noteList = this.getNoteList();
    const isLoading = user_book_notes.next_url||user_book_notes.fetching_notes;
    return (
      <div className="user-book-notes">
        <div className="note-list" onScroll={this.handleListScroll.bind(this)}>
          { noteList.length ? noteList :
            user_book_notes.fetching_notes ? null : (<Empty/>) }
          <Loadings ref='loadingView' inView={true} show={isLoading} />
        </div>
        <Drawer
          pos="bottom"
          show={this.state.showDeleteDrawer}
          onRequestClose={this.hideDeleteDrawer.bind(this)}
        >
          <DrawerContent>
            确定要删除吗
            <ConfirmButtons
              onCancel={this.hideDeleteDrawer.bind(this)}
              onConfirm={this.handleNoteDelete.bind(this)}
            />
          </DrawerContent>
        </Drawer>
        <Toast
          show={this.state.showToast}
          message={this.state.toastMsg}
          status={this.state.toastStatus}
          autoHide
        />
      </div>
    )
  }
}
