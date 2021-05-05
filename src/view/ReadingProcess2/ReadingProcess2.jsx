import React from 'react';
import {Link} from 'react-router-dom';
import {getCourseIndex} from "../../utils/lesson_helper";
import Tag from '../../common_component/Tag';
import {ROOT_URL} from "../../api/const";
import "./style.scss";




class StatusLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  getLabel()
  {
    switch (this.props.status) {
      case 'finished':  return '已读';
      case 'not_finished':  return '未读';
      case 'late':  return '补读';
      default:  return '';

    }
  }

  getClassName()
  {
    switch (this.props.status) {
      case 'finished':  return 'finished';
      case 'not_finished':  return 'not_finished';
      case 'late':  return 'late';
      default:  return '';
    }
  }

  render() {
    let label = this.getLabel();
    let classname = this.getClassName();
    return (
      <div className = {"status-label "+classname}>
        {label}
      </div>
    );
  }

}

class CurProcessItem extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const {course,id,picture,name,date,desc,status} = this.props.lesson_info;
    return (
       <Link to={'/reading2/'+course+'/'+id+'/HEAD'} id={'reading-process2-item-'+id} className = 'reading-process2-item active' >
              <div className="progress-content">
                <div className='cur-lesson-item'>
                <div className="course-list-item-bg ">
                  <img src={ROOT_URL + picture}/>
                  <div className="course-info">
                    <div className="name">
                      {name}
                    </div>
                    <div className="time">
                      {date}
                    </div>
                  </div>
                </div>
                <div className="today-lesson">
                  <div className="lesson-name">
                      {name}
                  </div>
                  <div className='lesson-desc'>
                    {desc}
                  </div>
                </div>
                  <StatusLabel status={status}/>
                </div>
              </div>
            </Link>
    )
  }
}

export default class ReadingProcess2 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const {actions,cur_course,courses,lessons,cur_lesson_info} = this.props;
    const coursesData = courses.courses;
    const lessonsData = lessons.lessons;
    const course_id = this.props.match.params.course_id;
    if(!cur_course.uuid) {
      const course_index = getCourseIndex(courses,course_id);
      actions.setCourseToStore(coursesData[course_index]);
      actions.fetchLessons(course_id);
    }
    if(cur_course.uuid && !lessonsData.length){
        actions.fetchLessons(cur_course.uuid);
    }

    if(lessonsData.length && !cur_lesson_info.date){
      if(this.getDefaultLesson(this.props).date) {
        actions.setCurLessonInfo(this.getDefaultLesson(this.props));
      }
    }
    if(lessonsData.length && cur_lesson_info.date){
      this.scrollToday(this.getDefaultLesson(this.props).id);
    }
  }

  componentWillReceiveProps(nextProps){
    const {actions,lessons} = this.props;
    const lessonsData = lessons.lessons;
    const nextLessonData = nextProps.lessons.lessons;
    if(!lessonsData.length && nextLessonData.length)
    {
        actions.setCurLessonInfo(this.getDefaultLesson(nextProps));
    }
    this.scrollToday(this.getDefaultLesson(nextProps).id);
  }

  getDefaultLesson(props){
    const { today,lessons } = props;
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

  scrollToday(cur_lesson_id)
  {
    if(cur_lesson_id){
      if($('#reading-process2-item-'+cur_lesson_id).offset()){
        let offsetTop = $('#reading-process2-item-'+cur_lesson_id).offset().top;
        $(window).scrollTo(offsetTop-350, 500);
      }
    }
  }

  render() {
    const { cur_lesson_info } = this.props;
    const cur_lesson_id = cur_lesson_info.id;
    const course_id = this.props.match.params.course_id;
    const lessons = this.props.lessons.lessons;
    let progressItems = [];
    let cur_section={};
    if(lessons && lessons.length){
      for(let i=0;i<lessons.length;i++){
        let d = lessons[i];
        if(d.section){
          if(cur_section.name!=d.section.name){
            progressItems.push(
              <div className="progress-section" key={d.section.id}>
                {d.section.name}
              </div>
            )
          }
          cur_section = d.section
        }
        progressItems.push(
          (d.id==cur_lesson_id)?(
            <CurProcessItem lesson_info = {d}/>
            // <Link to={'/reading2/'+course_id+'/'+d.id+'/HEAD'} id={'reading-process2-item-'+cur_lesson_id} className = 'reading-process2-item active' >
            //   <div className="progress-content">
            //     <div className='cur-lesson-item'>
            //     <div className="course-list-item-bg ">
            //       <img src={ROOT_URL + d.picture}/>
            //       <div className="course-info">
            //         <div className="name">
            //           {name}
            //         </div>
            //         <div className="time">
            //           {d.date}
            //         </div>
            //       </div>
            //     </div>
            //     <div className="today-lesson">
            //       <div className="lesson-name">
            //           {d.name}
            //       </div>
            //       <div className='lesson-desc'>
            //         {d.desc}
            //       </div>
            //     </div>
            //     </div>
            //   </div>
            // </Link>
          ):(
            <Link to={'/reading2/'+course_id+'/'+d.id+'/HEAD'} key = {d.id} id = {"reading-process2-item-" + d.id} className = { 'reading-process2-item' }>

            <div className = "progress-content">
                <div>
                  {d.name}
                </div>
                <div className = "progress-time">
                  {d.date}
                </div>
              </div>
            <StatusLabel status = {d.status} />
          </Link>
            )

        )
      }
    }

    return (
      <div className = "reading-process2">
        <div className="progress-items">
          {progressItems}
        </div>
      </div>
    );
  }
}
