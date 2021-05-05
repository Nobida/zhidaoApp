import React from 'react';
import {Link} from 'react-router-dom';
import {share} from "../../svg/index";
import Icon from '../../common_component/Icon';
import Button from '../../common_component/Button';
import {getCourseIndex,getCourseState} from "../../utils/lesson_helper";
import {ROOT_URL,USER_GUIDE_BG,USER_GUIDE_ID} from "../../api/const";
import Card from '../../common_component/Card'
import {BookPage} from "../../common_component/BookPage/index";
import Article from '../Article'
import './style.scss';


//二维码显示层
class QRMask extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div className="qr-mask" onClick={this.props.onClick}>
        {this.props.assistant&&this.props.assistant.qr?(
          <div className="assistant-info">
            <div className="name">{this.props.assistant.name}</div>
            <img src={ROOT_URL + this.props.assistant.qr}/>
          </div>
        ):(
          <div>
            暂无助教信息
          </div>
        )}
      </div>
    )
  }
}


export default class UserGuide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_course: null,
      show_qr_mask: false,
      cur_index: -1
    };
  }

  componentDidMount(){
    const { actions, studentID, status } = this.props
    status.map((item) => {
      actions.fetchCourseList(studentID, item);
    })
    this.setCurCourse(this.props)
  }  
  componentWillReceiveProps(nextProps){
    //this.setCurCourse(nextProps)
  }
  setCurCourse(props){
     const { match, courses,actions } = props;
     const course_id = match.params.course_id;
     const courseData = courses.courses;
     if(course_id){
       actions.fetchCourseByID(course_id)
     }  
    //  const course_index = getCourseIndex(courses, course_id);
    //  // set cur course
    //  console.log(course_index);
    //  if (course_index != -1){
    //    this.setState({
    //      cur_course: courseData[course_index]
    //    })
    //  }
  }
  hideQRMask(){
    this.setState({
      show_qr_mask: false
    })
  }
  handleCourseItemClick(d){
    this.setState({
      show_qr_mask: true,
      cur_index: d
    });
  }
  render() {
    const {courses,cur_course} = this.props;
    const {show_qr_mask, cur_index} = this.state;
    const cur_course_status = cur_course?getCourseState(cur_course):null;
    const assistant_qr = cur_course&&cur_course.assistant?cur_course.assistant.qr:null;
    const assistant_name = cur_course&&cur_course.assistant?cur_course.assistant.name:null;
    const o = this; 
    //课程列表项


    console.log(USER_GUIDE_ID)
    const courseData = courses.all_courses

    const courseList = courseData.length?courseData.map(function(d,i){
      return(
        <div key={i} className="course-item" onClick={o.handleCourseItemClick.bind(o,i)}>
          {d.name} 
        </div>
      );
    }):null;
    //通用的引导信息
    const common_info = (
      <div>
        <p>在您进入每个课程之前，您可以<strong>添加课程对应的知道君为好友</strong>，您可以点击下面的课程按钮查看您所报名课程对应的知道君二维码</p>
        <div className="course-item-container">
         {courseList}
        </div>
      </div>
    );
    //具体每个课程的引导信
    const lead_info = cur_course&&assistant_name&&assistant_qr?(
            <div>
              {/* { (cur_course_status == 'WAITING' || cur_course_status== 'ONGOING') &&
              (<p>
                欢迎您报名 <b>知道人文{cur_course.name}</b>，在进入课程前，您<strong>可以先添加课程对应的知道君为好友</strong>
              </p>)}
              { cur_course_status == 'TRIAL_WAITING' && (
                <p>
                欢迎您选择报名试读 <b>知道人文{cur_course.name}</b>，您可以在<strong>课程开始7天内(2018.10.8-2018.10.14)享受免费试读</strong><b>(包含知道经典第一单元开端部分中的内容)</b>，在课程结束前的任意时间段内您都可以选择是否购买本课程，在进入课程前，请您<strong>务必先添加课程对应的知道君为好友</strong>，请您<strong>务必先添加课程对应的知道君为好友</strong>
              </p>)} */} 
              <p> 
                欢迎您报名 <b>知道人文{cur_course.name}</b> 课程， 
                本课程的助教<b>{assistant_name}</b>二维码如下：
              </p>
              <div className="qr">
                <img  src={ROOT_URL + assistant_qr}/>
              </div>
              {/* <p>
                <small>
                  注：如您在本期报名了其他课程，请在其他课程的用户须知和班级信息界面查看知道君的微信
                </small>
              </p> */} 
            </div>

          ):common_info;
    //第三期录取通知书
    const admissionBtn= cur_course&&cur_course.enrolled&&(cur_course.uuid.substr(0,cur_course.uuid.length-1)=='course3'||cur_course.uuid.substr(0,cur_course.uuid.length-1)=='history1')?(
            <Link to={"/admission-notice/"+cur_course.uuid} className="admission-btn">
              领取录取通知书
            </Link>

          ):null;   
    return (    
      <div className="user-guide"> 
        <Card bg={cur_course&&cur_course.picture?ROOT_URL+cur_course.picture:USER_GUIDE_BG}>
        <h2><b>学员须知</b></h2></Card> 
          {lead_info}  
        {/* <Article article_id={USER_GUIDE_ID} hideTitle={true}/> */} 
        {(cur_course.user_guide&&cur_course.user_guide.length>1000)?(<BookPage noPadding content={{html:cur_course.user_guide}}/>):(<Article article_id={USER_GUIDE_ID} hideTitle={true}/>)}
        <br/>
        <br/>
        <div className="bottom-container">
          <Link className="invite-btn" to= {"/invitation" + (cur_course&&cur_course.uuid?'/'+cur_course.uuid:'')}>
            <Icon icon={share} size="xs"/>
            <span>邀请好友</span> 
          </Link>

        </div>
        {admissionBtn}
        {show_qr_mask&&cur_index!=-1?<QRMask assistant={courseData[cur_index].assistant} onClick={this.hideQRMask.bind(this)}/>:null}
      </div>
    );
  }
}
