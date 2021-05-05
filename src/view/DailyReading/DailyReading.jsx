import React from 'react';
import Button from '../../common_component/Button'
import IconButton from '../../common_component/IconButton'
import TextArea from '../../common_component/TextArea';
import Toast from '../../common_component/Toast';
import {left,right,menu} from '../../svg'
import Loadings from '../../common_component/Loadings';
import DailyCard from './DailyCard'
import {Link} from 'react-router-dom'
import {ROOT_URL} from '../../api/const'
import './style.scss';
import {getCourseIndex} from "../../utils/lesson_helper";
import {Drawer,DrawerContent} from "../../common_component/Drawer/index";
import LogInCheck from "../LogInCheck/LogInCheck";


class UnenrollCardInfo extends React.Component {
  render(){
    console.log(this.props.desc);
    const desc_lines = this.props.desc?this.props.desc.split('/'):[];
    const descs = desc_lines.map(function(d,i){
      return (<p>{d}</p>)
    })
    return(
      <div className='unenroll-card'>
        <div className='item-bg'>

          <img src={this.props.picture}/>
          <div className='mask'></div>
          <div className='course-info'>
            <div className='course-name'>{this.props.name}</div>
            <div className='time'>{this.props.begdt +'-' +this.props.enddt}</div>
          </div>
        </div>
        <div className='content'>
          <div className='desc'>
            {descs}
          </div>
          <div className='info'>
            点击下方报名按钮免费领取课程吧！
          </div>
        </div>

      </div>
    )
  }
}

export default class DailyReading extends React.Component {

  constructor(props) {
    super(props);
    this.state = { contents: '', showToast: false, lesson_index: 0 ,default_lesson_index:-1,showSelection:false};
  }

  handlePostContentInput(val) {
    this.setState({ contents: val });
  }

  showSelection(){
    this.setState({showSelection:true})
  }
  hideSelection(){
    this.setState({showSelection:false})
  }

  createPost() {
    const { actions } = this.props;
    const { contents } = this.state;
    this.setState({
      showToast: true
    });
    const { source_type, round_table_id } = this.props.match.params;
    if (source_type === 'round-table') {
      actions.createPost(contents, '', round_table_id);
    }
  }

  goBack() {
    const { history } = this.props;
    history.goBack();
  }

  getDefaultLessonIndex(props) {
    const {today, lessons} = props;
    const lessonsData = lessons.lessons;
    if (today.date && lessonsData.length) {
      for (let i = 0; i < lessonsData.length; i++) {
        if (lessonsData[i].date == today.date) {
          return i
        }
      }
    }
    return -1
  }


  componentDidMount(){
      const {actions,match,courses} = this.props;
      const course_id = match.params.course_id;
      actions.fetchLessons(course_id);
  }

  componentWillReceiveProps(nextProps){
    const pre_lessons = this.props.lessons;
    const {lessons} = nextProps
    if(pre_lessons.fetching_lessons && !lessons.fetching_lessons){
      const lesson_index = this.getDefaultLessonIndex(nextProps)
      this.setState({lesson_index:lesson_index,default_lesson_index:lesson_index});
    }
  }

  changeLeft(){
    const{lesson_index} = this.state;
    if(lesson_index>0){
      this.setState({lesson_index:lesson_index-1})
    }
  }
  changeRight(){
    const{lesson_index,default_lesson_index} = this.state;
    if(lesson_index<default_lesson_index){
      this.setState({lesson_index:lesson_index+1})
    }
  }
  showToast(){
    this.setState({showToast:true})
    setTimeout(()=>{this.setState({showToast:false})},2000)
  }
  handleLessonSelection(i){
    this.setState({lesson_index:i,showSelection:false})
  }
  render() {
    const {lesson_index} = this.state;
    const {lessons,courses,match} = this.props;
    const course_id = match.params.course_id;
    const course_index = getCourseIndex(courses,course_id);
    const cur_course = courses.courses[course_index];
    const o = this;
    //选择日期元素
    const selectionItems= lessons.lessons.map(function(d,i){
      return (<div key={i} className={'selection-item'+ (i==lesson_index?' active':'') } onClick={o.handleLessonSelection.bind(o,i)}>{d.name}</div>)
    })
    console.log('props')
    console.log(this.props);
    console.log(this.state);
    //未报名时渲染的卡片信息
    console.log(cur_course)
    console.log(cur_course.desc);

    return !cur_course?null:!(cur_course.enrolled)?(
      <div className="daily-reading">
        <UnenrollCardInfo picture={ROOT_URL+cur_course.picture} name={cur_course.name} desc={cur_course.desc} begdt={cur_course.begdt} enddt={cur_course.enddt}/>
        <div className='tools'>
          <Link to={'/ad-page/'+cur_course.uuid}>
            <Button type="primary" onClick={this.showToast.bind(this)}>立即报名</Button>
          </Link>
        </div>
      </div>
    ):!lessons.fetching_lessons && lessons.lessons.length && lesson_index!=-1 ?(
      <div className='daily-reading'>
        <DailyCard lesson_info={lessons.lessons[lesson_index]}/>
        <div className='tools'>
          <IconButton size='sm' icon={left} inverse={true} onClick={this.changeLeft.bind(this)}/>
          <Button type="primary" onClick={this.showToast.bind(this)}>分享日签</Button>
          <IconButton size='sm' icon={right} inverse={true} onClick={this.changeRight.bind(this)}/>
        </div>
        <IconButton size='sm' icon={menu} inverse={true} className="menu-btn" onClick={this.showSelection.bind(this)}></IconButton>
        <Toast show={this.state.showToast} message='长按图片保存分享日签'/>
        <Drawer pos='bottom' show={this.state.showSelection} onRequestClose={this.hideSelection.bind(this)}>
          <div className='selection-content'>
            {selectionItems}
          </div>
        </Drawer>
      </div>
    ):(<Loadings/>);
  }
}
