import React from 'react';
import './style.scss';
import CourseListItem from '../../common_component/MediaItem/CourseListItem';
import Button from '../../common_component/Button';
import {ROOT_URL,DEFAULT_COURSE_BG} from "../../api/const";
import {getTodayCourseLessonInfo} from "../../utils/lesson_helper";
import {getCourseState} from "../../utils/lesson_helper";
import Loadings from '../../common_component/Loadings'



export default class CourseList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const {actions, studentID, status} = this.props;
    status.map((item) => {
      actions.fetchCourseList(studentID, item);

    })
  }
  
  render(){

    const {ended_courses, registerable_courses, going_courses, waiting_courses, today} = this.props;

    const onGoingCourseList = going_courses.map(function(d,i){
      let  cur_lesson_info = getTodayCourseLessonInfo(d.uuid,today);
      return(
       <CourseListItem
          key={i}
          name={d.name}
          background={d.picture?ROOT_URL + d.picture:DEFAULT_COURSE_BG}
          uuid={d.uuid}
          enrolled={d.enrolled}
          active={d.active}
          begdt={d.begdt}
          enddt={d.enddt}
          registerable={d.registerable}
          registered={d.registered}
          lesson_info={cur_lesson_info}
          category={d.category}
          state="ONGOING"
        />
      )
    });
    const waitingCourseList = waiting_courses.map(function(d,i){
      return(
       <CourseListItem
          key={i}
          name={d.name}
          background={d.picture?ROOT_URL + d.picture:DEFAULT_COURSE_BG}
          uuid={d.uuid}
          enrolled={d.enrolled}
          active={d.active}
          begdt={d.begdt}
          enddt={d.enddt}
          registerable={d.registerable}
          registered={d.registered}
          category={d.category}
          state="WAITING"
        />
      )
    });
    const availableCourseList = registerable_courses.map(function(d,i){
      return(
       <CourseListItem
          key={i}
          name={d.name}
          background={d.picture?ROOT_URL + d.picture:DEFAULT_COURSE_BG}
          uuid={d.uuid}
          enrolled={d.enrolled}
          active={d.active}
          begdt={d.begdt}
          enddt={d.enddt}
          registerable={d.registerable}
          registered={d.registered}
          category={d.category}
          state="AVAILABLE"
        />
      )
    });
    const endedCourseList = ended_courses.map(function(d,i){
      return(
       <CourseListItem
          key={i}
          name={d.name}
          background={d.picture?ROOT_URL + d.picture:DEFAULT_COURSE_BG}
          uuid={d.uuid}
          enrolled={d.enrolled}
          active={d.active}
          begdt={d.begdt}
          enddt={d.enddt}
          registerable={d.registerable}
          registered={d.registered}
          category={d.category}
          state="ENDED"

        />
      )
    });
    return (
      <div className="course-list">
        <div>

          {onGoingCourseList}
          {waitingCourseList.length?(<h3 className="course-type-title">等待开课</h3>):''}

          {waitingCourseList}
          {availableCourseList.length?(<h3 className="course-type-title">报名中</h3>):''}

          {availableCourseList}
          {endedCourseList.length?(<h3 className="course-type-title">已经结束</h3>):''}

          {endedCourseList}
        </div>
      </div>
    )
  }
}
