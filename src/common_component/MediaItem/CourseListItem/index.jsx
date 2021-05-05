import React from 'react';
import {Link} from 'react-router-dom';
import Card from '../../Card';
import Tag from '../../Tag';


export default class CourseListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  getLink(){
    const {state,uuid} = this.props;
    switch (state){
      case 'ONGOING':
        return '/course/reading-process/'+uuid;
      case 'ENDED':
        return '/course/reading-process/'+uuid;
      case 'WAITING':
        return '/course-intro/'+uuid;
      case 'AVAILABLE':
        return '/course-intro/'+uuid;
      default:
        return '/course-intro/'+uuid
    }
  }
  getCatTag(){
    const {category} = this.props;
    switch (category){
      case 'dl':
        return (
          '每日阅读'
        );
      case 'cl':
        return (
          '研读课'
        );
      case 'sl':
        return (
          '小课'
        );
      case 'in':
        return (
          '导读课'
        );
      default:
        return '研读课'
    }
  }
  getStateTag(){
    const {state} = this.props;
    switch (state){
      case 'ONGOING':
        return (
          '进行中'
        );
      case 'ENDED':
        return (
          '已结束'
        );
      case 'AVAILABLE':
        return (
          '报名中'
        );
      case 'WAITING':
        return (
          '等待开课'
        );
      default:
        return null
    }
  }
  render() {
    const { name, background, begdt, enddt} = this.props;
    //const localTime = getLocalTime(time, 8);

    const link = this.getLink();
    const tag = this.getStateTag();
    const cat = this.getCatTag();
    return (
      <Link to={link} >
        <div className="course-list-item">
        <div className="course-list-item-bg">
          <img src={background}/>
          <div className='mask'/>
          <div className="course-info">
            <div className="name">
              {name}
            </div>
            <div className="time">
              {begdt +'-' +enddt}
            </div>
          </div>
          <div className="tag-list">
             <Tag size="sm"  type="primary">{tag}</Tag>
             <Tag size="sm">{cat}</Tag>
          </div>
        </div>
        {/*<Card className="course-list-item" bg={background}>*/}
          {/*<div className="course-info">*/}
            {/*<div className="name">*/}
              {/*{name}*/}
            {/*</div>*/}
            {/*<div className="time">*/}
              {/*{begdt +'-' +enddt}*/}
            {/*</div>*/}

          {/*</div>*/}
          {/*{tag}*/}

        {/*</Card>*/}
          {this.props.lesson_info?(
            <div className="today-lesson">
              <div className="info-row">
                <Tag size="sm" type="primary"><b>DAY{this.props.lesson_info.day_num}</b></Tag>
                <div className="label"> 今日课程 </div>
              </div>
              <div className="lesson-name">
                  {this.props.lesson_info.name}
              </div>
              <div className='lesson-desc'>
                {this.props.lesson_info.desc}
              </div>
            </div>
          ):null}

        </div>
      </Link>
    );
  }
}
