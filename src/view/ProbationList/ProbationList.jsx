import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import HrefLink from '../../common_component/HrefLink';
import Icon from '../../common_component/Icon';
import {left,right} from "../../svg";
import Loadings from '../../common_component/Loadings';
import {ROOT_URL,INTRO_URL} from "../../api/const";
import {getBackUpHeadImg} from "../../api/backup_head_img";
import Button from '../../common_component/Button';
import {withRouter} from 'react-router'

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

export default class ProbationList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const {course_id} = this.props.match.params;
    const {actions} = this.props;
    console.log(this.props);
    console.log(actions);
    actions.fetchCourseByID(course_id); 
  }


  render() {
    const {cur_course} = this.props;  
    const public_lessons = cur_course.public_lessons 

    const ifUnicom = (this.props.match.url.split('/')[1]==='probation-list-unicom'?true:false)

    
    const  lessonItems = (public_lessons && public_lessons.length)?public_lessons.map(function(d,i){
      return( 
        <div>
          {/* <div className="course-title"> {i%2==0?courses[i/2]:null}</div> */}
        <Link to={ifUnicom?("/reading-probation-unicom/"+cur_course.uuid+'/'+d.id+'/BG'):("/reading-probation/"+cur_course.uuid+'/'+d.id+'/BG')} key={d.id}>
          <div className="probation-item"> 
            
            <img className="bg" src={ROOT_URL + d.picture}/> 
            <div className="mask"/> 
            <div className="title-content">
              <h3>  
                <b>{d.name}</b>
              </h3> 
              <div className='desc'>{d.desc}</div>
            </div>
          </div>
        </Link>
        </div>
      )
    }):null; 
    return( 
      <div className="probation-list">
        <h3><b>请选择试读样章</b></h3>
        {lessonItems} 
      </div>
    )
  }
}
