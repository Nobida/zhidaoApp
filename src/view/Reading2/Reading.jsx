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
import {MoreTools,MoreToolItem} from "./MoreTools/index";
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
      startTime: date,
      showMoreTools: false
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
        resource={highlight.quoteType_fe}
        rating={highlight.rating}
        rated={highlight.rated}
        showFullContent={true}
      />
    ) : null;
  }

  getSelectionTools() {
    return this.props.cur_selection.contents ? (
      <div className='selection-tools'>
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
      url_array[5] = i;
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
    console.log('activeitem')
    console.log(this.state.activeItem)
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
    const course_id = this.props.match.params.course_id
    if (url_array[2] == id && url_array[3] == page_name) {
      this.hideDrawer();
    } else {
      history.replace('/'+parent_path+'/' +course_id+'/'+ id + '/' + page_name);
    }
  }

  handleQuoteClick(quoteType, item) {
    const { actions, match, history } = this.props;
    item.quoteType_fe = quoteType;
    actions.setCurHighlight(item);
    const lesson_id = match.params.id;
    const course_id = match.params.course_id;
    const page_name = item.lesson_page.split('/')[1];
    if (page_name.length) {
      history.push('/reading2/'+course_id+'/'+lesson_id+'/'+page_name+'/'+QUOTE_DRAWER);
    } else {
      console.error('引用内容中没有找到page_name信息');
    }
  }

  handleDeleteClick(deleteType, item) {
    //console.log('delete click')
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
    if (!lesson_info.id || lesson_info.id != lesson_id)
    {
      return true;
    } else {
      return false;
    }
  }

  //根据id获取page的下标
  getPageIndex(pageName) {
    const {lesson_info} = this.props.cur_lesson.lesson_info;
    const part_info = lesson_info.part_info;
    if(part_info) {
      for (let i = 0; i < part_info.length; i++) {
        if(part_info[i].id == pageName){
          return i
        }
      }
      if(pageName=='punch'){
        return part_info.length
      }
    }

    return 0;
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
    //统计阅读时长
    const lesson_id = this.props.match.params.id;

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
    const course_id = this.props.match.params.course_id;
    if (lesson_id && this.mismatchLessonID()) {
      console.log('clear lesson mismatch');
      actions.clearLesson();
      actions.fetchLesson(lesson_id,course_id);
      actions.fetchLessonUserNotes(lesson_id,user_id);
      //this.loadLessonPage(this.props);
      this.setState({
        showToast   : true,
        toastMsg    : '选中文本后点空白处释放可分享/标记文字',
        toastStatus : ''
      });
    } else if(lesson_id) {
      actions.fetchLesson(lesson_id,course_id);
      actions.fetchLessonUserNotes(lesson_id,user_id);
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

    //提交阅读记录
    setInterval(function(){
      const {actions} = o.props;
      const lesson_id = o.props.match.params.id;
      actions.submitLessonRecord(lesson_id)
    },30000)
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
    //const lesson_info = this
    this.setActiveItem(drawer);
    if (nextProps.cur_delete.success_info && this.props.cur_delete.deleting) {
      this.setState({
        showToast   : true,
        toastMsg    : '删除成功',
        toastStatus : 'finish'
      });

    }
    //切换页面时隐藏工具
    if(nextProps.match.params.page_name !=this.props.match.params.page_name){
      this.setState(
        {
          showMoreTools: false
        }
      )
    }
  }

  /**
   * 这个函数用于：从API更新数据
   */
  componentDidUpdate(prevProps) {
    console.log('Reading did update');
    const { actions, cur_lesson, cur_course, user_id, agent_type } = this.props;

    const course_id = this.props.match.params.course_id;
    if (!cur_course.course.uuid && !cur_course.fetching_course && course_id) {
      console.log('fetch cur_course: '+course_id);
      actions.fetchCourseByID(course_id);
    }

    const lesson_id = this.props.match.params.id;
    const prevId = prevProps.match.params.id;
    if (lesson_id != prevId && lesson_id) {
      console.log('lesson has changed, updating');
      this.resetSelection();
      console.log('clear lesson change');
      actions.clearLesson();
      actions.fetchLesson(lesson_id,course_id);
      actions.fetchLessonUserNotes(lesson_id,user_id);

      //this.loadLessonPage(this.props);
    }
  }

  toggleMoreTools(){
    this.setState({showMoreTools: !!!this.state.showMoreTools})
  }
  render() {
    console.log('Reading render');
    const { reading_settings,notes_user,location, agent_type, cur_lesson,match } = this.props;
    const lesson_info = cur_lesson.lesson_info.lesson_info;
    const lesson_id = match.params.id;
    const highlightItem = this.getHighlightItem();
    const selectionTools = this.getSelectionTools();
    const part_info = lesson_info && lesson_info.part_info?lesson_info.part_info:null;
    const page_name = this.props.match.params.page_name
    const index = this.getPageIndex(page_name);
    //当前卡片信息
    const cur_part_info = part_info && part_info[index]
    return (
      <div className={"reading theme-"+reading_settings.theme}>
        {lesson_info.id && lesson_info.id== lesson_id?(
          <ReadingContent
          onNoteItemClick={this.handleQuoteClick.bind(this,'note')}
          onFootMarkClick={this.handleFootMarkClick.bind(this)}
          onMoreClick={this.toggleMoreTools.bind(this)}
          more_tool_active={this.state.showMoreTools}
        />
        ):null}
        { !(cur_part_info && cur_part_info.interactive)?
          (<BottomNav
            activeItem={this.state.activeItem}
            handleIndexChange={this.handleIndexChange.bind(this)}>
            <BottomNavItem icon={menu} label='目录'/>
            <BottomNavItem icon={note} label='笔记'/>
            <BottomNavItem icon={question} label='问答'/>
            <BottomNavItem icon={setting} label='设置'/>
          </BottomNav>):null
        }
        { this.state.showMoreTools?
          (<MoreTools
            activeItem={this.state.activeItem}
            handleIndexChange={this.handleIndexChange.bind(this)}>
            <MoreToolItem icon={menu} label='目录'/>
            <MoreToolItem icon={note} label='笔记'/>
            <MoreToolItem icon={question} label='问答'/>
            <MoreToolItem icon={setting} label='设置'/>
          </MoreTools>):null
        }
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
