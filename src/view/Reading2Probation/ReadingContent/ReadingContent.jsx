/**
 * Reading Content
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import {ROOT_URL} from "../../../api/const";
import Toast from '../../../common_component/Toast';
import Audio from '../../../common_component/Audio';
import {BookPage} from '../../../common_component/BookPage';
import QA from '../QA';
import Quiz from '../Quiz';
import Button from '../../../common_component/Button';
import ImageViewer from '../../../common_component/ImageViewer';
import { SwiperContainer, SwiperItem } from "../../../common_component/Swiper";
import { title_qa,lock,information,check } from "../../../svg";
import Loadings from '../../../common_component/Loadings';
import ShareLead from '../../../common_component/ShareLead';
import { setPunchPage } from '../../../utils/punchHelper';
import PageCardHeader from './PageCardHeader';
import './style.scss';


export default class ReadingContent extends React.Component {
  constructor(props){
    super(props);
    this.state={
      showToast   : false,
      toastStatus : '',
      toastMsg    : '',
      showShareLead: false,
      showImageViewer: false,
      imageViewerSrc : ''
    }
  }

  //根据id获取page的下标
  getPageIndex(pageName) {
    const {lesson_info} = this.props;
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

  //根据下标获取page的id
  getPageName(index) {
    const {lesson_info} = this.props;
    const part_info = lesson_info.part_info;
    if(part_info && index>=0 && index<part_info.length) {
      return part_info[index].id;
    }
    else if(index==part_info.length){
      return 'punch'
    }
    else if(part_info){
      return part_info[0].id;
    }
  }
  //设置图片显示
  setShowImageViewer(){
     const o = this;
     $('body').on('click',function(e){
       let targetContainer = $(e.target).parent();
       if(targetContainer.hasClass('picbox')){
         o.setState({showImageViewer: true, imageViewerSrc: $(e.target).attr('src')})
       }
     })

  }
  //隐藏图片显示
  hideImageViewer(){
    this.setState({showImageViewer: false})
  }

  //滑动响应事件
  handleSlideChange(index){
    const { history,location } = this.props;
    const lesson_id = this.props.match.params.id;
    const page_name = this.getPageName(index);
    const parent_path = location.pathname.split("/")[1];
    //更新路由
    if (page_name != this.props.match.params.page_name) {
      history.replace("/"+parent_path+'/'+lesson_id+'/'+page_name);
    }
  }

  handleSelection(selection){
    const { actions } = this.props;
    actions.setCurSelection(selection);
  }
  showShareLead(){
    const { actions } = this.props;
    setPunchPage(actions.setSharePage, actions.createSharePage);
    this.setState({showShareLead: true});
  }

  hideShareLead(){
    this.setState({showShareLead: false})
  }

  componentWillReceiveProps(nextProps){
     const {actions,match} = nextProps;
     const lesson_id = match.params.id;
     const cur_submit_quiz = nextProps.cur_submit_quiz;
     const pre_submit_quiz = this.props.cur_submit_quiz;

     if(!cur_submit_quiz.submitting_quiz && pre_submit_quiz.submitting_quiz){
       actions.fetchLessonQuizStatus(lesson_id);
     }
     if (cur_submit_quiz.submitting_quiz) {
      this.setState({
        showToast   : true,
        toastStatus : 'loading',
        toastMsg    : '正在提交',
      });
    } else if (cur_submit_quiz.error_info) {
      this.setState({
        showToast   : true,
        toastStatus : 'fail',
        toastMsg    : '提交失败',
      });
    } else if (pre_submit_quiz.submitting_quiz && cur_submit_quiz.success_info) {
      this.setState({
        showToast   : true,
        toastStatus : 'success',
        toastMsg    : '提交成功',
      });
      actions.fetchUserStat();
    }
  }
  componentDidMount() {

    const { lesson_progress,actions,match,lesson_info,lesson_page,highlight } = this.props;
    const lesson_id = match.params.id;
    const part_info = lesson_info.part_info;

    //获取lesson的答题状态和用户信息
    actions.fetchLessonQuizStatus(lesson_id);
    actions.fetchUserStat();

    //设置图片点击浏览
    this.setShowImageViewer();

    //根据part info获取lessonpage
    if(part_info){
      for(let i=0;i<part_info.length;i++){
        if(!lesson_page[part_info[i].id] || lesson_page[part_info[i].id].lesson !=lesson_id){
          actions.fetchLessonPage(lesson_id,part_info[i].id);
        }
        let container = ReactDOM.findDOMNode(this.refs[part_info[i].id]);
        //加载历史纪录
        if(lesson_progress[part_info[i].id] && container) {
          if(!highlight.selection || !highlight.selection.contents) {
            $(container).scrollTo(lesson_progress[part_info[i].id]);
          }
        }
      }
    }
  }
  //卡片滑动到上一张
  switchLeft(){
    const { history,location } = this.props;
    const index = this.getPageIndex(this.props.match.params.page_name);
    const lesson_id = this.props.match.params.id;
    if(index==0){
      return;
    }
    const page_name = this.getPageName(index-1);
    const parent_path = location.pathname.split("/")[1];
    if (page_name != this.props.match.params.page_name) {
      history.replace("/"+parent_path+'/'+lesson_id+'/'+page_name);
    }
  }
  //卡片滑动到下一张
  switchRight(){
    const { history,location } = this.props;
    const index = this.getPageIndex(this.props.match.params.page_name);
    const lesson_id = this.props.match.params.id;
    const page_name = this.getPageName(index+1);
    console.log('pathname');
    console.log(page_name);
    const parent_path = location.pathname.split("/")[1];
    if (page_name != this.props.match.params.page_name){
      history.replace("/"+parent_path+'/'+lesson_id+'/'+page_name);
    }
  }

  componentWillUnmount() {
    console.log('ReadingContent will unmount');
    const { actions,lesson_info } = this.props;

    const part_info = lesson_info.part_info;
    let reading_progress = {};
    if(part_info){
      for(let i=0;i<part_info.length;i++){
        let container = ReactDOM.findDOMNode(this.refs[part_info[i].id]);
        let p = $(container).scrollTop();
        reading_progress[part_info[i].id] = p;
      }
      actions.setCurLessonProgress(reading_progress);
    }
    actions.setDefaultSharePage();
  }

  //检查quiz卡片的答题状态，做完返回1，没做完返回0
  checkQuizCardStatus(quiz){
    const {lesson_quiz_status} = this.props;
    const quizes = quiz.quizes;
    const {quiz_results,status} = lesson_quiz_status;
    if(status=='finished')
      return true;
    if(!quiz_results || !quizes || status=='not_punched')
      return false;
    const answered_quizes = quiz_results.map(function(d){return d.order});
    for(let i=0;i<quizes.length;i++){
      if(answered_quizes.indexOf(quizes[i])==-1)
        return false;
    }
    return true;
  }

  //检查是否有上一首
  checkAudioHasPrev(){
    const index = this.getPageIndex(this.props.match.params.page_name);
    const part_info = this.props.lesson_info.part_info;
    if(!part_info || index==0){
      return false
    }
    const audioMedias = part_info[index-1] && part_info[index-1].medias.filter(function(d){return d.type=='audio'})
    //如果上一个卡片还有资源返回true
    return audioMedias.length > 0
  }
  //检查是否有下一首
  checkAudioHasNext(){
    const index = this.getPageIndex(this.props.match.params.page_name);
    const part_info = this.props.lesson_info.part_info;
    if(!part_info || index>=part_info.length-1){
      return false
    }
    const audioMedias = part_info[index+1] && part_info[index+1].medias.filter(function(d){return d.type=='audio'})
    //如果接下来的卡片还有资源返回true
    return audioMedias.length > 0
  }

  render(){
    const fontSize = this.props.reading_settings.font_size;
    const cHeight = document.body.offsetHeight - 60;
    const {agent_type,lesson_info,lesson_quiz_status,apikey} = this.props;
    const activeSlide = this.getPageIndex(this.props.match.params.page_name);
    //在PC上禁止滑动（为了可以选中文字）
    const slideClassName = agent_type=='PC'?'book-page-slide-container swiper-no-swiping':'book-page-slide-container'
    const part_info = this.props.lesson_info.part_info;
    const lesson_page = this.props.lesson_page;
    const index = this.getPageIndex(this.props.match.params.page_name);
    //当前卡片信息
    const cur_part_info = part_info && part_info[index]
    //当前卡片的音频信息
    const curAudioMedias = cur_part_info && cur_part_info.medias && cur_part_info.medias.filter(function(d){return d.type=='audio'})
    //音频是否可切换
    const curAudioHasNext = this.checkAudioHasNext();
    const curAudioHasPrev = this.checkAudioHasPrev();
    const o = this;
    let swipers = [];
    console.log('lesson content props')
    console.log(this.props);

    if(part_info && lesson_quiz_status){
      for(let i=0;i<part_info.length;i++){
        let pageName = part_info[i].id;
        let page_content;
        let button_content;
        if(lesson_page.fetching_lesson_page[pageName]){
          page_content = (
            <Loadings show={true}/>
          )
        } else {
          if (part_info[i].type == 'text') {
            page_content = (
              <BookPage
                  fontSize={fontSize}
                  onNoteItemClick={o.props.onNoteItemClick}
                  highlight={o.props.highlight}
                  selection={o.props.selection}
                  onFootMarkClick={o.props.onFootMarkClick}
                  content={lesson_page[pageName]}
                  apikey={o.props.apikey}
                  highlights={o.props.notes_user}
                  handleSelection={o.handleSelection.bind(o)}
                  page_type={pageName}
                />
            )
            button_content = (i < (part_info.length - 1)) ? (
              <Button className='next-btn' onClick={this.switchRight.bind(this)}>点此进入下一部分</Button>
            ) : null;
          }
          else if (part_info[i].type == 'quiz' && lesson_page[pageName]) {
            page_content = (
              <Quiz
                lesson = {lesson_page[pageName].lesson}
                quizes = {lesson_page[pageName].quizes}
                isPreviewer = {true}
              />
            );
            button_content = (i < (part_info.length - 1)) ? (
              <Button className='next-btn' onClick={this.switchRight.bind(this)}>点此进入下一部分</Button>
            ) : null;
          }
        }
        swipers.push(
          <SwiperItem
          key={i}
          className={slideClassName}
          ref={pageName}
          style={{height:cHeight}}>
            {/*<div className="lesson-name">{lesson_info.name}</div>*/}
            {/*<div className="page-name">{part_info[i].name}</div>*/}
            <PageCardHeader
              cardName={part_info[i].name}
              lessonName={lesson_info.name}
              dayNum={lesson_info.day_num}
              cardCount={part_info.length}
              curCardNum={i+1}
              cardBanner={part_info[i].banner?part_info[i].banner:''}
            />
            {page_content}
            {button_content}
            <br/>
            <br/>
            <br/>
            <br/>
          </SwiperItem>
        )
      }
    }
    if (part_info && part_info.length && lesson_quiz_status) {
    return (
      <div>
        {agent_type=='PC'?(<div className="header">
          <div className="left" onClick={this.switchLeft.bind(this)}>上一部分</div>
          <div className="right" onClick={this.switchRight.bind(this)}>下一部分</div>
        </div>):null}

      <SwiperContainer
        className="reading-content"
        activeSlide={activeSlide}
        onSlideChange={this.handleSlideChange.bind(this)}>
        {swipers}
      </SwiperContainer>
      { curAudioMedias && curAudioMedias.length &&
        <Audio
          title={cur_part_info && cur_part_info.name}
          onPrevClick={this.switchLeft.bind(this)}
          onNextClick={this.switchRight.bind(this)}
          onTimeFinish={this.switchRight.bind(this)}
          has_prev={curAudioHasPrev}
          has_next={curAudioHasNext}
          src={ROOT_URL+curAudioMedias[0].src+'?apikey='+apikey}
        />
      }
      {this.state.showImageViewer && <ImageViewer src={this.state.imageViewerSrc} onRequestClose={this.hideImageViewer.bind(this)}/>}
      <Toast
          show={this.state.showToast}
          autoHide
          message={this.state.toastMsg}
          status={this.state.toastStatus}
        />
        <ShareLead show={this.state.showShareLead} onRequestClose={this.hideShareLead.bind(this)}/>
      </div>
    );}else{
      return (
        <Loadings show={true}/>
      )
    }
  }
};