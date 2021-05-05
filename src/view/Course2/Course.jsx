import React from 'react';
import ReadingProcess2 from '../ReadingProcess2'
import ReadingCard from '../ReadingCard'
import {getCourseIndex} from "../../utils/lesson_helper";
import Loadings from '../../common_component/Loadings';
import { LabelTabContainer, LabelTabItem } from "../../common_component/LabelTabs";
import "./style.scss";

export default class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        activeIndex:0
    }
  }




  handleIndexChange(i){
    let path_name = '';
    switch (i){
      case 0:
        path_name = 'reading-process';
        break;
      case 1:
        path_name = 'round-table';
        break;
      case 2:
        path_name = 'class';
        break;
      default:
        path_name = 'reading-process';
        break;
    }
    const { history } = this.props;
    const cur_path = this.props.location.pathname.split('/')[2];
    const course_id = this.props.location.pathname.split('/')[3];
    if (cur_path && course_id && cur_path != path_name ) {
        history.replace('/course/'+ path_name +'/' + course_id)
    }
  }
  setPageIndex(page_name){
    let page_index = 0;
    switch (page_name){
      case 'reading-process':
        page_index = 0;
        break;
      case 'round-table':
        page_index = 1;
        break;
      case 'class':
        page_index = 2;
        break;
      default:
        page_index = 0;
        break;
    }
    this.setState({ activeIndex: page_index });
  }

  componentWillReceiveProps(nextProps){
    const cur_path = nextProps.location.pathname.split('/')[2];
    const course_id = nextProps.location.pathname.split('/')[3];
    this.setPageIndex(cur_path)
    const {actions,cur_course,lessons} = nextProps;
    const lessonsData = lessons.lessons;
    if(cur_course && cur_course.uuid && course_id && cur_course.uuid==course_id && lessonsData.length){
      if(this.getDefaultLesson(nextProps).date) {
        actions.setCurLessonInfo(this.getDefaultLesson(nextProps));
      }
    }
  }
  getDefaultLesson(props){
    console.log('props');
    console.log(props);
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
  componentDidMount(){
    const cur_path = this.props.location.pathname.split('/')[2];
    const course_id = this.props.location.pathname.split('/')[3];
    this.setPageIndex(cur_path);
    const {actions,cur_course,courses,lessons,cur_lesson_info} = this.props;
    // const coursesData = courses.courses;
    // const lessonsData = lessons.lessons;
    // console.log('course props');
    // console.log(this.props)
    actions.clearLesson();
    //各种不同情况下的course，lessson数据获取
    // if(!cur_course.uuid && !course_id) {
    //   actions.setCourseToStore(coursesData[coursesData.length -1]);
    //   actions.fetchLessons(coursesData[coursesData.length -1].uuid);
    // }
    if(course_id) {
      actions.fetchLessons(course_id)
      actions.fetchCourseByID(course_id)
    }
    // if(!cur_course.uuid && course_id || cur_course.uuid && course_id && cur_course.uuid!=course_id){
    //   const courseIndex = getCourseIndex(courses,course_id);
    //   if(courseIndex!=-1) {
    //     actions.setCourseToStore(coursesData[courseIndex]);
    //     actions.fetchLessons(course_id);
    //   }
    // }
    // if(cur_course.uuid && course_id && cur_course.uuid==course_id && !lessonsData.length){
    //     actions.fetchLessons(course_id);
    // }
    // //设置今日
    // if(cur_course.uuid && course_id && cur_course.uuid==course_id && lessonsData.length){
    //   if(this.getDefaultLesson(this.props).date) {
    //     actions.setCurLessonInfo(this.getDefaultLesson(this.props));
    //   }
    // }

  }


  render() {
    const fetching_lessons = this.props.lessons.fetching_lessons;
    console.log('course props')
    console.log(this.props);
    return (
      <div className="course">
        
        <LabelTabContainer className="fixed-head"
                           activeItem={this.state.activeIndex}
                           handleIndexChange={this.handleIndexChange.bind(this)}>

          <LabelTabItem>目录</LabelTabItem>
          <LabelTabItem>圆桌</LabelTabItem>
          <LabelTabItem>排行榜</LabelTabItem>
        </LabelTabContainer>
        <div className="course-content">
          {fetching_lessons ? (<Loadings show={true}/>):this.props.children}
        </div>
      </div>
    );
  }
}
