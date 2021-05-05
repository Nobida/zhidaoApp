import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom'
import Button from '../../../common_component/Button'
import './style.scss'
import Icon from '../../../common_component/Icon'
import {share} from "../../../svg/index";

export default class HomeCap extends React.Component {

  render(){
    const {
      date,
      name,
      desc,
      picture,
      day_num,
      id,
      course_id,
      ifUnicom
    } = this.props;
    const descs = desc.split('/').map(function(d,i){
      return (
        <div key={i}>
          {d}
        </div>
      )
    });


    return (
     <div className="head-cap-container" >
        <div className="head-container">
            <div className="head-cap">
              <div className="progress-bg"/>
              <img ref="headImgBg"/>
              <img ref="headImg" src={picture}/>
              <div className="img-overlay"/>
              {ifUnicom?<div className="day">
                <img src='img/page-title-unicom.png'/>
              </div>:<div className="day">DAY{day_num}</div>}
              <div className="date">{date}</div>
            </div>
          </div>
          <div className="info-container">
              <h3 className="text-center">{name}</h3>
              <div className="text-center text-muted desc">
                {descs}
              </div>
          </div>
          {!this.props.isProbation?(<Link to={'/memo/'+course_id+'/'+id} className="share">
              <Icon size='xs' icon={share}/>
              <span>分享日签</span>
            </Link>):null}
          {ifUnicom ? <div className="switch-btn-unicom"  onClick={this.props.onButtonClick}>点击进入阅读  &gt;&gt;</div> :
          <Button className="switch-btn"  onClick={this.props.onButtonClick}>点击进入阅读</Button>}

      </div>
    );
  }
}