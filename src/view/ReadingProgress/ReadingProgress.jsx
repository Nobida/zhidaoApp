import React from 'react';
import {Canlendar} from "../../common_component/Calendar";
import {Drawer} from "../../common_component/Drawer";
import {Link} from 'react-router-dom';
import Button from '../../common_component/Button';
import Loadings from '../../common_component/Loadings';
import {PanelSelectionContainer,PanelSelectionItem} from "../../common_component/PanelSelection";
import { BOOK_COVER_URL } from '../../api/const';

import {
  getDefaultScheduleHelper,
  getLessonsByCourseId,
  getLessonsCalendarData,
  getValidCourseId,
  getCourseIndex,
  isDataLoaded
} from "../../utils/lesson_helper";
import './style.scss';

const formatDate = function (date,year=true) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    if(year)
      return y + '-' + m + '-' + d;
    else{
      return  m + '-' + d;
    }
};
class LessonInfo extends React.Component{
    constructor(props) {
        super(props);
      }
    render(){
        return (
            <div className="lesson-info">
                <div className="day">
                    {'DAY'+this.props.lesson.day_num}
                </div>
                <div className="lesson-title">
                    {this.props.lesson.name?this.props.lesson.name:' '}
                </div>
                <div className="lesson-buttons">
                    <Link to={"/reading/"+this.props.lesson.id+'/BG'}>
                      <Button className="lesson-button">
                          进入阅读
                      </Button>
                    </Link>
                    <Link to={"/book-info/"+this.props.lesson.books[0]}>
                      <Button className="lesson-button" type="ghost">
                          查看书籍
                      </Button>
                    </Link>
                </div>
            </div>
        )
    }
}

class BookItems extends React.Component {
    constructor(props){
        super(props);
    }
    handleBookItemClick(d){
        if(this.props.handleBookItemClick){
            this.props.handleBookItemClick(d);
        }
    }
    render(){
        let bookItems = [];
        let o= this;

        if(this.props.schedule && this.props.curSchedule){
            let curBegDt = this.props.curSchedule.begdt;
            let curEndDt = this.props.curSchedule.enddt;
            bookItems = this.props.schedule.map(function (d) {
                let className = 'book-item-round';
                let begDt = new Date(d.begdt);
                let endDt = new Date(d.enddt);
                if(o.props.curSchedule.books) {
                  if (d.books[0] == o.props.curSchedule.books[0]) {
                    className += ' active'
                  }
                }
                return (
                <div className={className} onClick={o.handleBookItemClick.bind(o,d)} key={d.books[0]}>
                    <div className="book-cover">
                        <img src={BOOK_COVER_URL+d.books[0]+".round.jpg"}/>
                    </div>
                    <div className="book-label">
                        {formatDate(begDt,false)+'/'+formatDate(endDt,false)}
                    </div>
                </div>
                )
            })
        }
        return (
          <div className="book-item-container">
              {bookItems}
          </div>
        )
    }
}

export default class ReadingProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        showInfoPanel: false,
        curLesson: null,
        curSchedule: null,
        curCourseIndex: -1,
        showSelectDrawer: false
    }
  }

  componentDidUpdate(){
    const {actions,cur_course,cur_schedule,cur_lesson_info,lessons} = this.props;
    const lessonsData = lessons.lessons;
    if(cur_course.schedule && !cur_schedule.begdt)
      actions.setCurSchedule(this.getDefaultSchedule(cur_course));
    if(!cur_lesson_info.date && lessonsData.length){
      if(this.getDefaultLesson().date) {
         actions.setCurLessonInfo(this.getDefaultLesson());
      }
    }
  }
  componentDidMount(){
      const {actions,cur_course,courses,lessons,cur_lesson_info} = this.props;
      const coursesData = courses.courses;
      const lessonsData = lessons.lessons;
      if(!cur_course.uuid) {
        actions.setCourseToStore(coursesData[coursesData.length -1]);
        actions.fetchLessons(coursesData[coursesData.length -1].uuid);
      }
      if(cur_course.uuid && !lessonsData.length){
          actions.fetchLessons(cur_course.uuid);
      } 
      if(cur_course.uuid){
        console.log('set default schedule');
        actions.setCurSchedule(this.getDefaultSchedule(cur_course));
      }

      if(lessonsData.length && !cur_lesson_info.date){
        if(this.getDefaultLesson().date) {
          actions.setCurLessonInfo(this.getDefaultLesson());
        }
      }
      this.showFixedHead();
  }


  changeCurCourse(i){
    const {courses, actions} = this.props;
    const coursesData = courses.courses;
    actions.setCourseToStore(coursesData[i]);
    actions.fetchLessons(coursesData[i].uuid);
    actions.clearLesson();
    actions.setCurSchedule(this.getDefaultSchedule(coursesData[i]));
    this.setState({showInfoPanel:false,showSelectDrawer:false});
    //this.hideSelectDrawer();
  }

  showSelectDrawer(){
    this.setState({showSelectDrawer: true});
  }
  hideSelectDrawer(){
    this.setState({showSelectDrawer:false});
  }
  handleBookItemClick(d){
    const {actions} = this.props;
    actions.setCurSchedule(d);
  }

  getDefaultLesson(){
    const { today,lessons } = this.props;
    const lessonsData = lessons.lessons;
    if(today.date && lessonsData.length){
      for(let i=0;i<lessonsData.length;i++){
        if(lessonsData[i].date == today.date){
          return lessonsData[i]
        }
      }
    }
    return {}
  }
  getDefaultSchedule(course){
    const { today,cur_lesson_info } = this.props;
    const curDate = new Date(today.date);
    if(cur_lesson_info.date && course.uuid && cur_lesson_info.course == course.uuid){
      const lessonDate = new Date(cur_lesson_info.date);
      const schedule = course.schedule;
      for(let i =0;i<schedule.length;i++){
        let sDate = new Date(schedule[i].begdt);
        let eDate = new Date(schedule[i].enddt);
        if(lessonDate>=sDate && lessonDate<=eDate){
          return schedule[i]
        }
      }
    }
    if(course.schedule){
      const schedule = course.schedule;
      for(let i =0;i<schedule.length;i++){
        let sDate = new Date(schedule[i].begdt);
        let eDate = new Date(schedule[i].enddt);
        if(curDate>=sDate && curDate<=eDate){
          return schedule[i]
        }
      }
      return course.schedule[0];
    }
    return {};

  }
  showFixedHead(){
    $(window).on('scroll',function(){
        let topScroll =$(window).scrollTop() ;
        let fixedHead = $('.read-head-fixed');
        if(topScroll > 157+45-95.67){
          $(fixedHead).css('display','block');
          $(fixedHead).addClass('head-shadow');
        }else{
          $(fixedHead).css('display','none');
          $(fixedHead).removeClass('head-shadow');
        }
    })
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

  getLessonsCalendarData(){
    const {lessons,cur_course,cur_schedule, cur_lesson_info} = this.props;
    const lessonsData = lessons.lessons;
    const scheduleBegDt = cur_schedule.begdt;
    const scheduleEndDt = cur_schedule.enddt;
    let lessonsCalendarData = [];
    if(cur_course.begdt) {
      const courseBegDate = new Date(cur_course.begdt);
      const courseEndDate = new Date(cur_course.enddt);

      if(!lessonsData.length){
        console.log('coursebegdt');
        console.log(courseBegDate);
        console.log('courseenddt');
        console.log(courseEndDate);
         let date = courseBegDate;
         while(date<=courseEndDate){
           let dateStr = formatDate(date);
           let highlight = false;
           if(scheduleBegDt && scheduleEndDt){
             if(date>=new Date(scheduleBegDt) && date<=new Date(scheduleEndDt)){
               highlight= true;
             }
           }
           lessonsCalendarData.push({date:dateStr,status:'not_come',highlight:highlight});
           date = new Date(date.getFullYear(),date.getMonth(),date.getDate()+1);
         }
         console.log('lessonscalendardate');
        console.log(lessonsCalendarData);
      }else{
        const lessonBegDate = new Date(lessonsData[0]);
        const lessonEndDate = new Date(lessonsData[lessonsData.length-1]);

        for (let i = 0; i < lessonsData.length; i++) {
          lessonsData[i].highlight = false;
          lessonsData[i].selected = false;
          if(cur_schedule.books && lessonsData[i].books && cur_schedule.books[0] == lessonsData[i].books[0]){
              lessonsData[i].highlight = true;
          }
          if(cur_lesson_info.date && lessonsData[i].date && cur_lesson_info.date == lessonsData[i].date){
              lessonsData[i].selected = true;
          }
          lessonsCalendarData.push(lessonsData[i])
        }

        if(lessonsData[lessonsData.length-1].date!=cur_course.date){
          let date = lessonEndDate;
          while(date<=courseEndDate){
            date = new Date(date.getFullYear(),date.getMonth(),date.getDate()+1);
            let dateStr = formatDate(date);
            lessonsCalendarData.push({date:dateStr,status:'not_come'});
          }
        }

      }

    }
    return lessonsCalendarData;

  }

  closeLessonInfoPanel(){
     this.setState({showInfoPanel:false});
  }
  handleCalendarItemClick(lesson){
      const {actions} = this.props;
      console.log(lesson);
      if(lesson.name){
        actions.setCurLessonInfo(lesson);
        this.setState({showInfoPanel:true});
      }

  }

  render() {
    console.log('ReadingProgress render');
    console.log(this.props);
    console.log(this.state);
    console.log('reading progress props');
    console.log(this.props);
    const {courses,today,lessons,cur_schedule,cur_course,cur_lesson_info} = this.props;
    const curCourseIndex = this.getCurCourseIndex();
    const coursesData = courses.courses;
    const lessonsData = lessons.lessons;
    const todayLesson = this.getDefaultLesson();
    const lessonsCalendarData = this.getLessonsCalendarData();
    const courseItems = (coursesData && coursesData.length)?coursesData.map(function(d,i){
      return (
        <PanelSelectionItem key={d.uuid}>
          {d.name}
        </PanelSelectionItem>
      )
    }):null;
    const readHead = (
      <div className="read-head">
           <div className="course-name" onClick={this.showSelectDrawer.bind(this)}>
               {cur_course.name}
               </div>
            <div className="read-head-title">
              <div className="day-info">
                DAY{todayLesson.day_num?todayLesson.day_num:0}
              </div>
            </div>
             <div className="read-head-info">
                <div className="hint hint-success">
                    当日已读
                </div>
                <div className="hint hint-info">
                    补读
                </div>
                <div className="hint hint-warning">
                    未读
                </div>
             </div>
         </div>
    );
    const readingProgress = (
     <div>
       {readHead}
         <div className="read-head-fixed">
           <div className="info">
             <div className="course-name" onClick={this.showSelectDrawer.bind(this)}>
               {cur_course.name}
               </div>
             <div className="read-info">
                 <div className="hint hint-success">
                      已读
                  </div>
                  <div className="hint hint-info">
                      补读
                  </div>
                  <div className="hint hint-warning">
                      未读
                  </div>
             </div>
           </div>
           <div className="clndr-head">
                <div>日</div>
                <div>一</div>
                <div>二</div>
                <div>三</div>
                <div>四</div>
                <div>五</div>
                <div>六</div>
            </div>
         </div>
         <div className="read-main">
             {(lessonsCalendarData.length)?(
                 <Canlendar days={lessonsCalendarData}
                            anchorDate={(cur_schedule)?cur_schedule.begdt:null}
                            handleItemClick={this.handleCalendarItemClick.bind(this)}/>
                 ):null}
             </div>
          <Drawer className="lesson-info-panel" pos="bottom"
                  show={this.state.showInfoPanel}
                  hideOverlay
                  showClose
                  onRequestClose={this.closeLessonInfoPanel.bind(this)}>
                  <LessonInfo lesson={cur_lesson_info}/>
          </Drawer>

          <Drawer className="select-drawer" pos="bottom" show={this.state.showSelectDrawer} onRequestClose={this.hideSelectDrawer.bind(this)}>
            <PanelSelectionContainer activeItem={curCourseIndex} handleIndexChange={this.changeCurCourse.bind(this)}>
              {courseItems}
            </PanelSelectionContainer>
          </Drawer>
          <BookItems schedule={cur_course.schedule} curSchedule={cur_schedule} handleBookItemClick={this.handleBookItemClick.bind(this)}/>

     </div>

    );
    return(
         <div className="reading-progress">
             {(isDataLoaded(courses,lessons,today))? readingProgress:(<Loadings show={true}/>)}
         </div>
    )
  }
}





