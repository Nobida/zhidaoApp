import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import HrefLink from '../../common_component/HrefLink';
import Icon from '../../common_component/Icon';
import {share,left,right} from "../../svg";
import Loadings from '../../common_component/Loadings';
import {ROOT_URL,INTRO_URL} from "../../api/const";
import {getBackUpHeadImg} from "../../api/backup_head_img";
import {getValidCourseIndex} from "../../utils/lesson_helper";

import {
  getCurLessonsData,
  getCourseIndex,
  getLessonsByCourseId,
  getValidCourseId,
  isDataLoaded
} from "../../utils/lesson_helper";
import {Drawer} from "../../common_component/Drawer";
import {PanelSelectionContainer,PanelSelectionItem} from "../../common_component/PanelSelection";
import './style.scss';



class HomeInfo extends React.Component {

  componentWillReceiveProps(nextProps){
      let headImg = ReactDOM.findDOMNode(this.refs.headImg);
      let headImgBg = ReactDOM.findDOMNode(this.refs.headImgBg);
      if(nextProps.imgSrc!=this.props.imgSrc) {
        $(headImg).css({opacity: 0}).attr("src", nextProps.imgSrc)
          .delay(200)
          .animate({opacity: 1}, 300);
        $(headImgBg)
          .css({opacity: 1})
          .attr("src", this.props.imgSrc)
          .animate({opacity: 0}, 300);
      }
  }
  render(){
    const {
      date,
      link,
      handleSwitchLeft,
      handleSwitchRight,
      leftActive,
      rightActive,
      name,
      desc,
      href,
      imgSrc,
      headInfo
    } = this.props;
    const descs = desc.split('/').map(function(d,i){
      return (
        <div key={i}>
          {d}
        </div>
      )
    });
    return (
     <div className="home-container" >
        <div className="head-container">
          <div className={leftActive?'':'unactive'}>
            <Icon icon={left} size="sm" onClick={handleSwitchLeft?handleSwitchLeft:null}/>
          </div>
          <HrefLink href={href?href:'/main/home'}>
            <div className="head-cap">
              <div className="progress-bg"/>
              <img ref="headImgBg"/>
              <img ref="headImg" src={imgSrc}/>
              {headInfo.length?(<div className="img-overlay"/>):null}
              <div className="day">{headInfo}</div>
              <div className="date">{date}</div>
            </div>
          </HrefLink>
          <div className={rightActive?'':'unactive'}>
            <Icon icon={right} size="sm" className="right" onClick={handleSwitchRight?handleSwitchRight:null}/>
          </div>
          </div>
          <div className="info-container">
            <HrefLink href={href?href:'/main/home'}>
              <h3 className="text-center">{name}</h3>
            </HrefLink>
            <HrefLink href={href?href:'/main/home'}>
              <div className="text-center text-muted desc">
                {descs}
              </div>
            </HrefLink>
          </div>
      </div>
    );
  }
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index:0,
      default_index:-1,
      showSelectDrawer: false,
      curCourseIndex: -1
    };
  }

  componentDidMount() {
    const {actions,cur_course,courses,lessons,} = this.props;
    const course_id = this.props.match.params.course_id;
    const lesson_id = this.props.match.params.lesson_id;
    const coursesData = courses.courses;
    const lessonsData = lessons.lessons;
    if(!cur_course.uuid) {
      if(course_id){
        const course_index = getCourseIndex(courses,course_id);
        actions.setCourseToStore(coursesData[course_index]);
        actions.fetchLessons(course_id);
      }else{
        actions.setCourseToStore(coursesData[coursesData.length -1]);
        actions.fetchLessons(coursesData[coursesData.length - 1].uuid);
      }
    }
    scrollTo(0,0);
    this.handleSwipe();
    $(window).scrollTop(0);
  }

  componentWillReceiveProps(nextProps){
    const {today, actions, lessons, cur_lesson_info} = nextProps;
    const lessonsData = lessons.lessons;
    console.log('home props');
    console.log(nextProps);
    if(lessonsData.length && !lessons.fetching_lessons && !cur_lesson_info.date){
      for(let i in lessonsData){
        if(lessonsData[i].date == today.date){
          actions.setCurLessonInfo(lessonsData[i])
        }
      }
    }
  }

  goToLastLesson(){
    const {actions,lessons} = this.props;
    const lessonsData = lessons.lessons;
    if(lessonsData.length)
      actions.setCurLessonInfo(lessonsData[lessonsData.length-1]);
  }

  getCurCourseIndex(){
    const { cur_course, courses} = this.props;
    const coursesData = courses.courses;
    let cur_index = -1;
    for(let i =0;i<coursesData.length;i++){
      if(coursesData[i].uuid == cur_course.uuid){
        cur_index = i;
        break;
      }
    }
    return cur_index;
  }
  getCurLessonIndex(){
    const { cur_lesson_info, lessons} = this.props;
    const lessonsData = lessons.lessons;
    let cur_index = -1;
    for(let i=0;i<lessonsData.length;i++){
      if(lessonsData[i].date == cur_lesson_info.date){
        cur_index = i;
        break;
      }
    }
    return cur_index;
  }
  goToPreLesson(){
    const {actions, lessons} = this.props;
    const lessonsData = lessons.lessons;
    const cur_index = this.getCurLessonIndex();
    if(cur_index>0)
      actions.setCurLessonInfo(lessonsData[cur_index-1])
  }

  goToNextLesson(){
    const {actions, lessons} = this.props;
    const lessonsData = lessons.lessons;
    const cur_index = this.getCurLessonIndex();
    console.log('cur index');
    console.log(cur_index+1);
    console.log(lessonsData[100]);
    console.log(lessonsData[ cur_index+1]);
    if(cur_index < lessonsData.length-1 && cur_index!=-1)
      actions.setCurLessonInfo(lessonsData[cur_index+1]);
    else if(cur_index == lessonsData.length-1)
      actions.setCurLessonInfo({});
  }

  changeCurCourse(i){
    const {courses, actions} = this.props;
    const coursesData = courses.courses;
    actions.setCourseToStore(coursesData[i]);
    actions.fetchLessons(coursesData[i].uuid);
    actions.clearLesson();
    this.hideSelectDrawer();
  }

  setLessonDays(props){
    const {courses, today, lessons } = props;
    const lessonDays = getCurLessonsData(courses,lessons,today);
    if(lessonDays && lessonDays.lesson_days){
      this.setState({
        lesson_days: lessonDays.lesson_days,
        index:lessonDays.todayIndex,
        default_index:lessonDays.todayIndex
      });
    }
  }

  showSelectDrawer(){
    this.setState({showSelectDrawer:true});
  }
  hideSelectDrawer(){
    this.setState({showSelectDrawer:false});
  }
  handleSwipe(){
    let hammerTest = new Hammer(ReactDOM.findDOMNode(this.refs.home));
    let o = this;

    hammerTest.on('swiperight', function(ev) {
      o.goToPreLesson();
    });
    hammerTest.on('swipeleft', function(ev) {
      o.goToNextLesson();
    });
  }
  /*
  handleSwitch(n){
    let {index,lesson_days} = this.state;
    if(n>=0 && n<lesson_days.length){
      this.setState({index:n});
    }
    if(n==lesson_days.length){
      this.setState({index:n});
    }
  }*/

  render() {
    const {courses,lessons,today,cur_course,cur_lesson_info} = this.props;
    const coursesData = courses.courses;
    const lessonsData = lessons.lessons;
    const {showSelectDrawer} = this.state;
    const todayDate = new Date(today.date);
    const curLessonIndex = this.getCurLessonIndex();
    const curCourseBegDate = new Date(cur_course.begdt);
    const curCourseIndex = this.getCurCourseIndex();
    const isCourseStart = curCourseBegDate? curCourseBegDate<=todayDate:false;
    const isWaiting = today.course_state == 'WAITING';
    const hasNewCourse = today.course_state == 'NEW_COURSE';

    const courseItems = (coursesData && coursesData.length)?coursesData.map(function(d,i){
      return (
        <PanelSelectionItem key={i}>
          {d.name}
        </PanelSelectionItem>
      )
    }):null;
    const lessonItem = cur_lesson_info.date?(
     <HomeInfo
       date = {cur_course.uuid!='course1'?cur_lesson_info.date:""}
       href = {"/reading/"+cur_lesson_info.id+'/BG'}
       handleSwitchLeft = {this.goToPreLesson.bind(this)}
       handleSwitchRight = {this.goToNextLesson.bind(this)}
       leftActive = {curLessonIndex>=0}
       rightActive = {curLessonIndex<lessonsData.length}
       name = {cur_lesson_info.name}
       desc = {cur_lesson_info.desc}
       imgSrc = {(cur_lesson_info.picture&&cur_lesson_info.picture!='')?(ROOT_URL+cur_lesson_info.picture):getBackUpHeadImg(cur_lesson_info.day_num).img}
       headInfo = {cur_course.uuid!='course1'?'DAY'+cur_lesson_info.day_num:""}

     />
    ):isCourseStart?hasNewCourse?(
      <HomeInfo
         date =  ""
         href = {INTRO_URL+'?source=self_app'}
         handleSwitchLeft = {this.goToLastLesson.bind(this)}
         handleSwitchRight = {null}
         leftActive = {true}
         rightActive = {false}
         name = {'有新课程可报名'}
         desc = {"点此了解详情"}
         imgSrc = {ROOT_URL+'pic/new_course.jpg'}
         headInfo = {""}
      />
    ):(
       <HomeInfo
         date = {today.date}
         handleSwitchLeft = {this.goToLastLesson.bind(this)}
         handleSwitchRight = {null}
         leftActive = {true}
         rightActive = {false}
         name = {'今日无课'}
         desc = {"温故而知新"}
         imgSrc = {ROOT_URL+'pic/review.jpg'}
         headInfo = {""}
      />
    ):(
       <HomeInfo
         date = {today.date}
         href = {"/user-guide/"+cur_course.uuid}
         handleSwitchLeft = {null}
         handleSwitchRight = {null}
         leftActive = {false}
         rightActive = {false}
         name = {'等待开课'}
         imgSrc = {ROOT_URL+'pic/waiting.jpg'}
         desc = {'点此阅读学员须知'}
         headInfo = {""}
      />
    );
    return (
      <div className="home" ref="home">

        <div className="course-title" onClick={this.showSelectDrawer.bind(this)}>
          <h4 className='title'>
            {cur_course.name}
          </h4>
        </div>

          {lessonItem}
          {cur_lesson_info.date?
          (
            <Link to={'/memo/'+cur_lesson_info.id} className="share">
              <Icon size='xs' icon={share}/>
              <span>分享日签</span>
            </Link>
          ):isWaiting||hasNewCourse?(
            <Link to='/invitation' className="share">
              <Icon size='xs' icon={share}/>
              <span>邀请好友</span>
            </Link>
            ):null}

        <Drawer className="select-drawer" pos="bottom" show={showSelectDrawer} onRequestClose={this.hideSelectDrawer.bind(this)}>
          <div className="drawer-scroll">
          <PanelSelectionContainer activeItem={curCourseIndex} handleIndexChange={this.changeCurCourse.bind(this)}>
            {courseItems}
          </PanelSelectionContainer>
          </div>
        </Drawer>
          <Loadings show={!isDataLoaded(courses,lessons,today)}/>
      </div>
    )
    }

}
