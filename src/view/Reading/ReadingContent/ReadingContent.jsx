/**
 * Reading Content
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Background from '../Background';
import Article from '../Article';
import Lecture from '../Lecture';
import QA from '../QA';
import Button from '../../../common_component/Button';
import { SwiperContainer, SwiperItem } from "../../../common_component/Swiper";
import { title_lecture, title_bg, title_qa,lock } from "../../../svg";
import './style.scss';

function getPageIndex(pageName) {
  switch(pageName){
    case 'BG':
      return 0;
    case 'Text':
      return 1;
    case 'Notes':
      return 2;
    case 'QA':
      return 3;
    default:
      return 0
  }
}
function getPageName(index) {
  switch(index) {
    case 0:
      return 'BG';
    case 1:
      return 'Text';
    case 2:
      return 'Notes';
    case 3:
      return 'QA';
    default:
      return 'BG'
  }
}


export default class ReadingContent extends React.Component {
  constructor(props){
    super(props);
  }

  handleSlideChange(index){
    const { history,location } = this.props;
    const lesson_id = this.props.match.params.id;
    const page_name = getPageName(index);
    console.log('pathname');
    console.log(page_name);
    const parent_path = location.pathname.split("/")[1];
    if (page_name != this.props.match.params.page_name) {
      history.replace("/"+parent_path+'/'+lesson_id+'/'+page_name);
    }
  }

  handleSelection(selection){
    const { actions } = this.props;
    actions.setCurSelection(selection);
  }

  getQuizButton() {
    const { lesson_status, location } = this.props;
    const lesson_id = this.props.match.params.id;
    const parent_path = location.pathname.split('/')[1];
    const probation_finished = (parent_path == 'reading-probation-finished');
    const probation = (parent_path == 'reading-probation' || parent_path == 'reading-probation-finished')?'-probation':'';
    if (lesson_status == 'finished' || lesson_status=='late' || probation_finished) {
      return (
        <Link to={"/punch"+probation+"/"+lesson_id}>
          <Button className="read-button">已答题，查看解析</Button>
        </Link>
      );
    } else if (lesson_status == 'not_finished') {
      return (
        <Link to={"/quiz"+probation+"/"+lesson_id}>
          <Button className="read-button">已读完，去做题</Button>
        </Link>
      );
    } else {
      return null;
    }
  }

   getQAItem(){
    console.log('part-list');
    console.log(this.props);
    const part_list = this.props.lesson_info.part_list;
    const cHeight = document.body.offsetHeight - 60;

    if(part_list && part_list.length){
      if(part_list.indexOf('q_and_a')!='-1'){

        return(
            <SwiperItem
                className="book-page-slide-container"
                ref='qaContainer'
                style={{height:cHeight}}>
                <div className="page-title" >
                  {title_qa}
                </div>
                <QA
                  fontSize={this.props.reading_settings.font_size}
                  highlight={this.props.highlight}
                  selection={this.props.selection}
                  onFootMarkClick={this.props.onFootMarkClick}
                  content={this.props.qa}
                  handleSelection={this.handleSelection.bind(this)}
                />
              </SwiperItem>
          )
      }else{
        return (
          null
        );
      }
    }

  }

  getLectureItem() {
    const { lesson_status, location } = this.props;
    const lesson_id = this.props.match.params.id;
    const fontSize = this.props.reading_settings.font_size;
    const parent_path = location.pathname.split('/')[1];
    const probation_finished = (parent_path == 'reading-probation-finished');
    const probation = (parent_path == 'reading-probation' || parent_path == 'reading-probation-finished')?'-probation':'';
    if (lesson_status == 'finished' || lesson_status == 'late' || probation_finished) {
      return [(
        <div className="page-title" key='title'>
          {title_lecture}
        </div>
      ), (
        <Lecture
          fontSize={fontSize}
          key='lecture'
          onNoteItemClick={this.props.onNoteItemClick}
          highlight={this.props.highlight}
          highlights={this.props.notes_user}
          selection={this.props.selection}
          content={this.props.lecture}
          onFootMarkClick={this.props.onFootMarkClick}
          apikey={this.props.apikey}
          handleSelection={this.handleSelection.bind(this)}
        />
      )];
    } else if (lesson_status == 'not_finished' && !probation_finished) {
      return (
        <div className="lock-lecture">
          {lock}
          <Link to={"/quiz"+probation+"/"+lesson_id}>
            <Button className="read-button" >答题后查看讲义 >></Button>
          </Link>
        </div>
      );
    } else if (lesson_status == 'not_come') {
      return [(
        <Link to={"/quiz"+probation+"/"+lesson_id} key='button'>
          <Button className="read-button">查看题目 >></Button>
        </Link>
      ), (
        <div className="page-title" key='title'>
          {title_lecture}
        </div>
      ), (
        <Lecture
          fontSize={fontSize}
          key='lecture'
          onNoteItemClick={this.props.onNoteItemClick}
          highlight={this.props.highlight}
          selection={this.props.selection}
          content={this.props.lecture}
          highlights={this.props.notes_user}
          onFootMarkClick={this.props.onFootMarkClick}
          handleSelection={this.handleSelection.bind(this)}
          apikey={this.props.apikey}
        />
      )]
    } else {
      return null;
    }
  }

  componentDidMount() {
    console.log('ReadingContent did mount');
    const { lesson_progress } = this.props;
    if (lesson_progress.BG) {
      let bgContainer = ReactDOM.findDOMNode(this.refs.bgContainer);
      $(bgContainer).scrollTo(lesson_progress.BG);
    }
    if (lesson_progress.Text) {
      let textContainer = ReactDOM.findDOMNode(this.refs.textContainer);
      $(textContainer).scrollTo(lesson_progress.Text);
    }
    if (lesson_progress.Lecture) {
      let lectureContainer = ReactDOM.findDOMNode(this.refs.lectureContainer);
      $(lectureContainer).scrollTo(lesson_progress.Lecture);
    }
    $('.book-page-slide-container').on('click',function(e){
      console.log(e);
      console.log(e.target);
      const scrollTop = $(this).scrollTop();
      const pageX = e.pageX;
      const pageY = e.pageY;
      console.log(scrollTop);
      console.log(pageX);
      console.log(pageY);
      const windowWidth = $(window).width();
      const windowHeight = $(window).height();
      // TODO footnote-mark判断不准确，屏幕左下角和右上角的点击有冲突，后面优化一下
      // if ($(e.target).attr('class') != 'footnote-mark') {
      //   if (pageX > windowWidth - 100 || pageY > windowHeight - 100) {
      //     $(this).scrollTo(scrollTop + windowHeight - 100, 200);
      //   }
      //   if (pageX < 100 || pageY < 100) {
      //     $(this).scrollTo(scrollTop - windowHeight + 100, 200);
      //   }
      // }
    });
  }

  switchLeft(){
    const { history,location } = this.props;
    const index = getPageIndex(this.props.match.params.page_name);
    const lesson_id = this.props.match.params.id;
    if(index==0){
      return;
    }
    const page_name = getPageName(index-1);
    console.log('pathname');
    console.log(page_name);
    const parent_path = location.pathname.split("/")[1];
    if (page_name != this.props.match.params.page_name) {
      history.replace("/"+parent_path+'/'+lesson_id+'/'+page_name);
    }
  }
  switchRight(){
    const { history,location } = this.props;
    const index = getPageIndex(this.props.match.params.page_name);
    const lesson_id = this.props.match.params.id;
    if(index>2){
      return;
    }
    const page_name = getPageName(index+1);
    console.log('pathname');
    console.log(page_name);
    const parent_path = location.pathname.split("/")[1];
    if (page_name != this.props.match.params.page_name) {
      history.replace("/"+parent_path+'/'+lesson_id+'/'+page_name);
    }
  }

  componentWillUnmount() {
    console.log('ReadingContent will unmount');
    const { actions } = this.props;
    let bgContainer = ReactDOM.findDOMNode(this.refs.bgContainer);
    let textContainer = ReactDOM.findDOMNode(this.refs.textContainer);
    let lectureContainer = ReactDOM.findDOMNode(this.refs.lectureContainer);
    let qaContainer = ReactDOM.findDOMNode(this.refs.qaContainer);
    let bgProgress = $(bgContainer).scrollTop();
    let textProgress = $(textContainer).scrollTop();
    let lectureProgress = $(lectureContainer).scrollTop();
    let qaProgress = $(qaContainer).scrollTop();
    actions.setCurLessonProgress({
      'BG': bgProgress,
      'Text': textProgress,
      'Lecture': lectureProgress,
      'QA': qaProgress
    });
  }

  render(){
    console.log('ReadingContent render');
    console.log('highlight');
    console.log(this.props.highlight);
    console.log('notes');
    console.log(this.props.notes_user);
    const fontSize = this.props.reading_settings.font_size;
    const cHeight = document.body.offsetHeight - 60;
    console.log('cHeight: ' + cHeight);
    const {agent_type} = this.props;
    const activeSlide = getPageIndex(this.props.match.params.page_name);
    const lectureItem = this.getLectureItem();
    const quizButton = this.getQuizButton();
    const qaItem = this.getQAItem();
    //在PC上禁止滑动（为了可以选中文字）
    const slideClassName = agent_type=='PC'?'book-page-slide-container swiper-no-swiping':'book-page-slide-container'
    const part_list = this.props.lesson_info.part_list;
    if (part_list && part_list.length) {
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
        <SwiperItem
          className={slideClassName}
          ref='bgContainer'
          style={{height:cHeight}}>
          <div className="page-title" >
            {title_bg}
          </div>
          <Background
            fontSize={fontSize}
            onNoteItemClick={this.props.onNoteItemClick}
            highlight={this.props.highlight}
            selection={this.props.selection}
            onFootMarkClick={this.props.onFootMarkClick}
            content={this.props.background}
            apikey={this.props.apikey}
            highlights={this.props.notes_user}
            handleSelection={this.handleSelection.bind(this)}
          />
          <Button
            className="read-button"
            onClick={this.handleSlideChange.bind(this,1)}>阅读正文 >></Button>
        </SwiperItem>
        <SwiperItem
          className={slideClassName}
          ref='textContainer'
          style={{height:cHeight}}>
          <div className="page-title" >
            DAY {this.props.day_num}
          </div>
          <Article
            fontSize={fontSize}
            highlight={this.props.highlight}
            onNoteItemClick={this.props.onNoteItemClick}
            selection={this.props.selection}
            apikey={this.props.apikey}
            highlights={this.props.notes_user}
            onFootMarkClick={this.props.onFootMarkClick}
            content={this.props.text}
            handleSelection={this.handleSelection.bind(this)}
          />
          {quizButton}
        </SwiperItem>
        <SwiperItem
          className={slideClassName}
          ref='lectureContainer'
          style={{height:cHeight}}>
          {lectureItem}
        </SwiperItem>
        {qaItem}
      </SwiperContainer>

      </div>
    );}else{
      return null;
    }
  }
};