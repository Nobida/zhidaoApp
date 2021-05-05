import React from 'react';
import { Link } from 'react-router-dom';
import { BOOK_COVER_URL,INTRO_URL } from '../../api/const';
import { getCourseBooks, getCourseIndex, getCourseState } from "../../utils/lesson_helper";
import { BookPage } from '../../common_component/BookPage';
import Loadings from '../../common_component/Loadings';
import {ROOT_URL} from "../../api/const";
import {share} from "../../svg/index";
import Icon from '../../common_component/Icon';
import './style.scss';

class CourseBookItem extends  React.Component {
  render(){
    const { data } = this.props;
    return (
      <Link to={'/book-info/'+data.uri}>
        <div className="course-book-item">
          <div className="book-item">
            <div className="book-cover">
              <img src={BOOK_COVER_URL+data.uri+".jpg"}/>
            </div>
          </div>
          <div className="book-item-info">
            <div className="book-title">{data.title}</div>
            <div className="book-time">{data.begdt+' > '+data.enddt}</div>
            <div className="book-desc">{data.desc}</div>
          </div>
        </div>
      </Link>
    )
  }
}

export default class CourseIntro extends React.Component {
  constructor(props) {
    super(props);
  }

  getCourseFromCourses(courseID){
    const { courses } = this.props;
    const coursesData = courses.courses;
    if (coursesData && coursesData.length) {
      const courseIndex = getCourseIndex(courses,courseID);
      if (courseIndex != -1) {
        return coursesData[courseIndex];
      }
    }
    return null;
  }

  needUpdateCourse() {
    const { cur_course } = this.props;
    if (cur_course.fetching_course) {
      return false;
    }
    if (cur_course.course.uuid == this.props.match.params.id && cur_course.course.detail) {
      return false;
    }
    return true;
  }

  componentDidMount(){
    console.log('CourseInfo did mount');
    const { actions, books } = this.props;
    const courseID = this.props.match.params.id;
    if (this.needUpdateCourse()) {
      console.log("need update course");
      //let course = this.getCourseFromCourses(courseID);
      actions.fetchCourseByID(courseID);
    }
    const booksData = books.books;
    if(!booksData || !booksData.length) {
      actions.fetchBooks();
    }
  }


  getImgs() {
    return ["https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=610259093,4184493625&fm=200&gp=0.jpg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514120513496&di=5c038c7b7605263a4a345651f1756415&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D8e7b753aa118972bb73708898ea411fc%2Fd50735fae6cd7b89c03c73ad052442a7d9330e4f.jpg"];
  }

  render(){
    console.log('CourseInfo render');
    const courseID = this.props.match.params.id;
    if (this.props.cur_course.course.uuid != courseID) {
      console.log("cur_course id not match, need update");
      return(
        <Loadings show={true}/>
      );
    }
    const { cur_course, books } = this.props;
    const course = cur_course.course;
    const courseBooks = getCourseBooks(course,books);
    const imgs = this.getImgs();
    const bookItems = (course.uuid == 'in1001') ? null : courseBooks.map(item =>
      <CourseBookItem data={item} key={item.uri}/>
    );
    const courseStatus = getCourseState(course);
    const detailHtml = course.detail?{html: course.detail}:null;
    return (
      <div className="course-info">
        <div className="course-head">

              <div className="bg-container">
                  <img className="bg" src={course&&course.picture?ROOT_URL+course.picture:imgs[0]}/>
              </div>
              <div className='content'>

                <div className="title">
                  {course?course.name:''}
                </div>
                <div className="date">
                  {course?course.begdt+'-'+course.enddt:''}
                </div>
              </div>
        </div>
        {courseStatus=='TRIAL_WAITING' &&
                <div className='trial-info'>
                  本课程是试读课程，课程开始后您可以免费试读七天，如需购买可直接点击下方购买按钮，也可以在7天试读期结束后再选择购买
                </div>}
        {detailHtml!=null?<BookPage content={detailHtml}></BookPage>:null}
        <div className="course-book-list">
          {bookItems}
        </div>
        {courseStatus!='ENDED' && course.enrolled ?(<Link to={'/invitation/'+course.uuid} className='invite'><Icon size='xs' icon={share}/><span>邀请好友</span></Link>):null}
        { courseStatus=='AVAILABLE'?(<a href={(course.ad_url?course.ad_url:INTRO_URL)+'?source=self_app'} className='bottom-info'>立即报名</a>):
          courseStatus=='WAITING'?<Link to={"/user-guide/"+course.uuid} className='bottom-info'>查看学员须知</Link>:
            courseStatus=='TRIAL_WAITING'?(
              <div className="bottom-info">
                <a className='intro-btn' href={(course.ad_url?course.ad_url:INTRO_URL)+'?source=self_app'}>点此购买</a>
                <Link className='ad-btn' to={"/user-guide/"+course.uuid}>查看学员须知</Link>
              </div>):null
        }

      </div>
    );
  }
}
