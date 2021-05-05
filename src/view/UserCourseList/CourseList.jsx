import React from 'react';
import {Link} from 'react-router-dom'
import Loadings from '../../common_component/Loadings';
import {ROOT_URL} from "../../api/const";
import {getCourseState} from "../../utils/lesson_helper";
import Empty from '../../common_component/Empty'
import './style.scss';

export default class CourseList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const {actions, studentID, status} = this.props;
    actions.fetchCourseList(studentID, 'going');
  }

  getImgs() {
    return ["https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=610259093,4184493625&fm=200&gp=0.jpg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514120513496&di=5c038c7b7605263a4a345651f1756415&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D8e7b753aa118972bb73708898ea411fc%2Fd50735fae6cd7b89c03c73ad052442a7d9330e4f.jpg"];
  }



  getCourseItems() {
    const imgs = this.getImgs();
    console.log("this.props.courses.courses")
    console.log(this.props)
    const courses = this.props.courses.going_courses
    return courses.length? courses.map((d, i) =>
      <Link to={'/user-course-info/'+d.uuid} key={d.uuid}>
          <div className="course-item">
              <div className="bg-container">
                  <img className="bg" src={d.picture?ROOT_URL+d.picture:imgs[0]}/>
              </div>
              <div className="title">
                {d.name}
              </div>
          </div>
      </Link>
    ):(<Empty/>);
  }

  render() {
    console.log('CourseList render');
    const { courses } = this.props;
    const courseItems = this.getCourseItems();
    return (
      <div className="course-list">
        {courseItems}
        <Loadings show={courses.fetching_courses}/>
      </div>
    );
  }
}
