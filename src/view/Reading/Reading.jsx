import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '../../common_component/IconButton';
import Button from "../../common_component/Button";
import Toast from '../../common_component/Toast';
import { BottomNav, BottomNavItem } from '../../common_component/BottomNav';
import { Drawer, DrawerContent } from "../../common_component/Drawer";
import { NoteListItem } from "../../common_component/NoteList";
import { question, menu, note, setting, share, close } from "../../svg";
import TOC from './TOC';
import ReadingContent from './ReadingContent';
import ReadingSetting from './ReadingSetting';
import NoteList from './NoteList';
import QuestionList from './QuestionList';
import { trackReadEvent } from '../../utils/cnzz_helper';
import {checkProbationPath} from "../../utils/path_helper";
import BackToHome from '../../common_component/BackToHome';
import './style.scss'

const NO_DRAWER         =-1;
const TOC_DRAWER        = 0;
const NOTE_DRAWER       = 1;
const QUESTION_DRAWER   = 2;
const SETTINGS_DRAWER   = 3;
const QUOTE_DRAWER      = 4;
const DELETE_DRAWER     = 5;
const FOOT_NOTE_DRAWER  = 6;

/**
 * Reading Page
 */
export default class Reading extends React.Component {

  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      activeItem: NO_DRAWER,
      deleteId: null,
      deleteType: null,
      showToast: false,
      toastMsg: '',
      toastStatus: '',
      footNoteContent: '',
      quoteType: '',
      startTime: date
    }
  }

  // TODO 点赞、删除功能
  getHighlightItem() {
    const { highlight } = this.props;
    return highlight.avatar ? (
      <NoteListItem
        key={highlight.uuid}
        avatar={highlight.avatar}
        nickname={highlight.nickname}
        contents={highlight.contents}
        create_dt={highlight.create_dt}
        id={highlight.uuid}
        resource={this.state.quoteType}
        rating={highlight.rating}
        rated={highlight.rated}
      />
    ) : null;
  }

  getSelectionTools() {
    return this.props.cur_selection.contents ? (
      <div>
        <IconButton icon={close}  className="close-btn" onClick={this.resetSelection.bind(this)}/>
        <Link to="/share-text" id="share-text">
          <IconButton icon={share} inverse className="share-btn"/>
        </Link>
        <Link to="/create-question">
          <IconButton icon={question}  className="question-btn" />
        </Link>
        <Link to="/create-note">
          <IconButton icon={note}  className="note-btn" />
        </Link>
      </div>
    ) : null;
  }
  
  showDrawer(i) {
    const { actions, match, history } = this.props;
    if (i != QUOTE_DRAWER) {
      actions.clearCurHighlight();
    }
    if (typeof(match.params.drawer) == "undefined") {
      history.push(match.url+'/'+i);
    } else if(match.params.drawer == i) {
      history.goBack();
    } else {
      let url_array = match.url.split('/');
      url_array[4] = i;
      history.replace(url_array.join('/'));
    }
  }

  hideDrawer() {
    const { actions, match, history } = this.props;
    actions.clearCurHighlight();
    if (typeof(match.params.drawer) != "undefined") {
      history.goBack();
    }
  }

  setActiveItem(drawer) {
    if (typeof(drawer) == "undefined") {
      this.setState({ activeItem: NO_DRAWER });
    } else if (this.state.activeItem != drawer) {
      this.setState({ activeItem: drawer });
    }
  }

  unHighlight() {
    const { actions } = this.props;
    actions.clearCurHighlight();
    this.hideDrawer();
  }

  resetSelection() {
    const { actions } = this.props;
    actions.setCurSelection({});
  }

  handleFootMarkClick(content) {
    this.setState({ footNoteContent: content });
    this.showDrawer(FOOT_NOTE_DRAWER);
  }

  handleIndexChange(i) {
    this.showDrawer(i);
  }

  handleTOCItemClick(id, page_name) {
    const { match, history,location } = this.props;
    let url_array = match.url.split('/');
    const parent_path = location.pathname.split('/')[1]
    if (url_array[2] == id && url_array[3] == page_name) {
      this.hideDrawer();
    } else {
      history.replace('/'+parent_path+'/' + id + '/' + page_name);
    }
  }

  handleQuoteClick(quoteType, item) {
    const { actions, match, history } = this.props;
    actions.setCurHighlight(item);
    this.setState({ quoteType });
    const lesson_id = match.params.id;
    const page_name = item.lesson_page.split('/')[1];
    if (page_name.length) {
      history.push('/reading/'+lesson_id+'/'+page_name+'/'+QUOTE_DRAWER);
    } else {
      console.error('引用内容中没有找到page_name信息');
    }
  }

  handleDeleteClick(deleteType, item) {
    this.setState({
      deleteId: item.uuid,
      deleteType,
    });
    this.showDrawer(DELETE_DRAWER);
  }

  handleDelete() {
    const { actions } = this.props;
    const { deleteId, deleteType } = this.state;
    if (deleteType == 'note') {
      actions.deleteNote(deleteId);
    } else if (deleteType == 'question') {
      actions.deleteQuestion(deleteId);
    }
    this.setState({
      showToast   : true,
      toastMsg    : '正在删除..',
      toastStatus : 'loading'
    });
    this.hideDrawer();
  };

  mismatchLessonID() {
    const { cur_lesson } = this.props;
    const lesson_id       = this.props.match.params.id;
    const lesson_info     = cur_lesson.lesson_info.lesson_info;
    const lesson_bg       = cur_lesson.lesson_bg.background;
    const lesson_lecture  = cur_lesson.lesson_lecture.lecture;
    const lesson_text     = cur_lesson.lesson_text.text;
    if (!lesson_info.id || !lesson_bg || !lesson_lecture || !lesson_text ||
      lesson_info.id != lesson_id || lesson_bg.lesson != lesson_id ||
      lesson_lecture.lesson != lesson_id || lesson_text.lesson != lesson_id)
    {
      return true;
    } else {
      return false;
    }
  }

  componentWillMount() {
    console.log('Reading will mount');
    const drawer = this.props.match.params.drawer;
    this.setActiveItem(drawer);
    const { cur_post } = this.props;
    console.log(cur_post)
    if (cur_post.success_info) {
      this.setState({
        showToast   : true,
        toastMsg    : '发布成功',
        toastStatus : 'success',
      });
    }
  }

  componentWillUnmount(){
    const {startTime} = this.state;
    const endTime = new Date();
    trackReadEvent((endTime-startTime)/1000);
  }

  /**
   * 这个函数用于：第一次从API更新数据
   */
  componentDidMount() {
    console.log('Reading did mount');
    this.resetSelection();
    const { actions, cur_post, user_id } = this.props;
    console.log(cur_post)
    if (cur_post.success_info) {
      actions.clearCurPost();
    }
    const lesson_id = this.props.match.params.id;
    if (lesson_id && this.mismatchLessonID()) {
      actions.clearLesson();
      actions.fetchLesson(lesson_id);
      actions.fetchLessonBG(lesson_id);
      actions.fetchLessonText(lesson_id);
      actions.fetchLessonLecture(lesson_id);
      actions.fetchLessonQA(lesson_id);
      actions.fetchLessonUserNotes(lesson_id,user_id);
      this.setState({
        showToast   : true,
        toastMsg    : '选中文本后点空白处释放可分享/标记文字',
        toastStatus : ''
      });
    } else if(lesson_id) {
      actions.fetchLesson(lesson_id);
      actions.fetchLessonUserNotes(lesson_id, user_id);
    } else {
      console.error('no lesson id!');
    }

    let o = this;
    $(window).on('contextmenu',function(){
      // TODO 排查所有的jQuery监听，监听不会自己卸载，unmount时要取消监听
      console.log('counter');
      o.setState({
        showToast   : true,
        toastMsg    : '选中文本后点空白处可分享/标记文字',
        toastStatus : ''
      })
    });
  }

  /**
   * 这个函数里面放：
   * 1.改变路由的逻辑
   * 2.改变state的逻辑
   */
  componentWillReceiveProps(nextProps) {
    console.log('Reading will receive props');
    console.log(this.props);
    console.log(nextProps);

    const drawer = nextProps.match.params.drawer;
    this.setActiveItem(drawer);
    if (nextProps.cur_delete.success_info && this.props.cur_delete.deleting) {
      this.setState({
        showToast   : true,
        toastMsg    : '删除成功',
        toastStatus : 'finish'
      });
    }
  }

  /**
   * 这个函数用于：从API更新数据
   */
  componentDidUpdate(prevProps) {
    console.log('Reading did update');
    const { actions, cur_lesson, cur_course, user_id, agent_type } = this.props;

    const course_id = cur_lesson.lesson_info.lesson_info.course;
    if (!cur_course.course.uuid && !cur_course.fetching_course && course_id) {
      console.log('fetch cur_course: '+course_id);
      actions.fetchCourseByID(course_id);
    }

    const lesson_id = this.props.match.params.id;
    const prevId = prevProps.match.params.id;
    if (lesson_id != prevId && lesson_id) {
      console.log('lesson has changed, updating');
      this.resetSelection();
      actions.clearLesson();
      actions.fetchLesson(lesson_id);
      actions.fetchLessonBG(lesson_id);
      actions.fetchLessonText(lesson_id);
      actions.fetchLessonLecture(lesson_id);
      actions.fetchLessonQA(lesson_id);
      actions.fetchLessonUserNotes(lesson_id,user_id);
    }
  }

  render() {
    console.log('Reading render');
    const { reading_settings,notes_user,location, agent_type } = this.props;
    const highlightItem = this.getHighlightItem();
    const selectionTools = this.getSelectionTools();
    return (
      <div className={"reading theme-"+reading_settings.theme}>

        <ReadingContent
          onNoteItemClick={this.handleQuoteClick.bind(this,'note')}
          onFootMarkClick={this.handleFootMarkClick.bind(this)}
        />
        <BottomNav
          activeItem={this.state.activeItem}
          handleIndexChange={this.handleIndexChange.bind(this)}>
          <BottomNavItem icon={menu}/>
          <BottomNavItem icon={note}/>
          <BottomNavItem icon={question}/>
          <BottomNavItem icon={setting}/>
        </BottomNav>
        <Drawer
          show={this.state.activeItem == TOC_DRAWER}
          pos="right"
          upper
          onRequestClose={this.hideDrawer.bind(this)}>
          <DrawerContent>
            <TOC
              onClickTOCItem={this.handleTOCItemClick.bind(this)}
            />
          </DrawerContent>
        </Drawer>
        <Drawer
          show={this.state.activeItem == NOTE_DRAWER}
          pos="right"
          size="lg"
          onRequestClose={this.hideDrawer.bind(this)}>
          <NoteList
            onQuoteClick={this.handleQuoteClick.bind(this, "note")}
            onDeleteClick={this.handleDeleteClick.bind(this, "note")}
          />
        </Drawer>
        <Drawer
          show={this.state.activeItem == QUESTION_DRAWER}
          pos="right"
          size="lg"
          onRequestClose={this.hideDrawer.bind(this)}>
          <QuestionList
            onQuoteClick={this.handleQuoteClick.bind(this, "question")}
            onDeleteClick={this.handleDeleteClick.bind(this, "question")}
          />
        </Drawer>
        <Drawer
          show={this.state.activeItem == SETTINGS_DRAWER}
          className="setting-container"
          pos="bottom"
          onRequestClose={this.hideDrawer.bind(this)}>
          <DrawerContent>
            <ReadingSetting/>
          </DrawerContent>
        </Drawer>
        <Drawer
          show={this.state.activeItem == QUOTE_DRAWER}
          className="note-info-container"
          hideOverlay={true}
          pos="bottom"
          showClose
          onRequestClose={this.unHighlight.bind(this)}>
          <div className="highlight-content">
            {highlightItem}
          </div>
        </Drawer>
        <Drawer
          show={this.state.activeItem == DELETE_DRAWER}
          className="delete-note-container"
          hideOverlay={true}
          pos="bottom"
          showClose
          onRequestClose={this.unHighlight.bind(this)}>
          <div className="delete-content">
            <p>确定要删除吗</p>
            <div className="button-tools">
              <Button onClick={this.handleDelete.bind(this)}>确定</Button>
              <Button onClick={this.hideDrawer.bind(this)} type='ghost'>取消</Button>
            </div>
          </div>
        </Drawer>
        <Drawer
          show={this.state.activeItem == FOOT_NOTE_DRAWER}
          className="note-info-container"
          pos="bottom"
          showClose
          onRequestClose={this.hideDrawer.bind(this)}>
          <div>
            <DrawerContent>
              {this.state.footNoteContent}
            </DrawerContent>
          </div>
        </Drawer>
        {selectionTools}
        <Toast
          show={this.state.showToast}
          autoHide
          message={this.state.toastMsg}
          status={this.state.toastStatus}
        />
        {!checkProbationPath(location) && agent_type!='PC' ?(<BackToHome position='top'/>):null}
      </div>
    );
  }
}
