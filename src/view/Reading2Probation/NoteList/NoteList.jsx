import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { TabItem, TabContainer } from "../../../common_component/Tabs";
import { NoteListItem } from "../../../common_component/NoteList";
import IconButton from '../../../common_component/IconButton';
import Loadings from '../../../common_component/Loadings';
import Empty from '../../../common_component/Empty';
import { note } from "../../../svg";
import './style.scss';

export default class NoteList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      curTab: 0,
      doInitScroll: true,
    }
  }

  getNotesByTab(tab) {
    const { notes_all, notes_user } = this.props;
    const notes_now = (tab == 0) ? notes_all : notes_user;
    return notes_now;
  }

  scrollToProgress() {
    const { lesson_note_progress } = this.props;
    const progress = (this.state.curTab == 0) ?
                      lesson_note_progress['common'] :
                      lesson_note_progress['mine'];
    const noteList = ReactDOM.findDOMNode(this.refs.noteList);
    console.log(noteList);
    console.log($(noteList));
    console.log($(noteList).scrollTop());
    console.log(progress);
    if (progress != $(noteList).scrollTop()) {
      $(noteList).scrollTo(progress);
    }
  }

  saveProgress() {
    const { actions } = this.props;
    const noteList = ReactDOM.findDOMNode(this.refs.noteList);
    const progress = $(noteList).scrollTop();
    console.log(progress)
    if (this.state.curTab == 0) {
      actions.setCurLessonNoteProgress({ common: progress });
    } else if (this.state.curTab == 1) {
      actions.setCurLessonNoteProgress({ mine: progress });
    }
  }

  onQuoteClick(item) {
    if (this.props.onQuoteClick) {
      this.props.onQuoteClick(item);
    }
  }

  onDeleteClick(item) {
    if (this.props.onDeleteClick) {
      this.props.onDeleteClick(item);
    }
  }

  toggleFavorClick(item) {
    const { actions } = this.props;
    actions.toggleFavorOfNote(item.uuid, item.rated);
  }

  handleTabIndexChange(i) {
    this.saveProgress();
    const { actions, lesson_id, user_id } = this.props;
    const notes = this.getNotesByTab(i);
    if (notes.notes.length) {
      this.setState({ curTab: i }, () => {
        this.scrollToProgress();
      });
    } else {
      if (i == 0 && notes.next_url) {
        actions.fetchLessonNotes(lesson_id);
        actions.setCurLessonNoteProgress({ common: 0 });
      } else if (i == 1 && notes.next_url) {
        actions.fetchLessonUserNotes(lesson_id, user_id);
        actions.setCurLessonNoteProgress({ mine: 0 });
      }
      this.setState({ curTab: i });
    }
  }

  handleNoteListScroll(e) {
    const { actions, lesson_id, user_id } = this.props;
    const notes_now = this.getNotesByTab(this.state.curTab);
    if (notes_now.fetching_notes || !notes_now.next_url) {
      return;
    }
    const clientHeight = e.target.clientHeight; // 可视区域
    const scrollTop = e.target.scrollTop;       // 滚动高度
    const scrollHeight = e.target.scrollHeight; // 总高度
    const loadingView = ReactDOM.findDOMNode(this.refs.loadingView);
    const noteList = ReactDOM.findDOMNode(this.refs.noteList);
    const GAP = $(loadingView).height() + parseInt($(noteList).css('marginBottom'));
    if (clientHeight + scrollTop >= scrollHeight - GAP) {
      console.log("reach bottom");
      if (lesson_id && this.state.curTab == 0) {
        actions.fetchLessonNotes(lesson_id, notes_now.next_url);
      } else if (lesson_id && this.state.curTab == 1) {
        actions.fetchLessonUserNotes(lesson_id, user_id, notes_now.next_url);
      }
    }
  }

  componentWillMount() {
    console.log('NoteList will mount');
    const { actions, cur_post } = this.props;
    console.log(cur_post)
    if (cur_post.success_info) {
      actions.setCurLessonNoteProgress({ common: 0, mine: 0 });
      this.setState({ doInitScroll: false });
    }
  }

  componentDidMount() {
    console.log('NoteList did mount');
    const { actions, lesson_id, notes_all } = this.props;
    if (notes_all.notes.length && this.state.doInitScroll) {
      this.scrollToProgress();
    } else {
      actions.fetchLessonNotes(lesson_id);
      actions.setCurLessonNoteProgress({ common: 0 });
    }
  }

  componentWillUnmount() {
    this.saveProgress();
  }

  render() {
    console.log('NoteList render');
    const notes_now = this.getNotesByTab(this.state.curTab);
    const noteList = notes_now.notes.map(item => {
      let contents = item.contents;
      let selection = item.selection;
      // if (contents.length > 40) {
      //   contents = contents.substring(0, 40) + '...';
      // }

      return (
        <NoteListItem
          key={item.uuid}
          avatar={item.avatar}
          nickname={item.nickname}
          contents={contents}
          selection={selection}
          create_dt={item.create_dt}
          id={item.uuid}
          own={item.user == this.props.user_id}
          onQuoteClick={this.onQuoteClick.bind(this,item)}
          onDeleteClick={this.onDeleteClick.bind(this,item)}
          onRatingClick={this.toggleFavorClick.bind(this,item)}
          rated={item.rated}
          rating={item.rating}
          showFavor={true}
        />
      );
    });
    const loadingView = (notes_now.next_url || notes_now.fetching_notes) ? (
      <Loadings ref='loadingView' inView={true} show={true} />
    ) : null;
    return(
      <div className="note-list-drawer">
        <TabContainer className="tabs-fixed-top" handleIndexChange={this.handleTabIndexChange.bind(this)}>
          <TabItem>全部笔记</TabItem>
          <TabItem>我的笔记</TabItem>
        </TabContainer>
        <div className="note-list-container" ref='noteListContainer' onScroll={this.handleNoteListScroll.bind(this)}>
          <div className="note-list" ref='noteList'>
            { noteList.length?noteList:notes_now.fetching_notes?null:(<Empty/>)}
            { loadingView }
          </div>
        </div>
        <Link to="/create-note">
          <IconButton className="create-note-btn" icon={note}/>
        </Link>
      </div>
    )
  }
}
