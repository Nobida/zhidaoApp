import React from 'react';
import Avatar from '../../common_component/Avatar';
import './style.scss';
import Button from "../../common_component/Button/index";
import {ROOT_URL,DEFAULT_COURSE_BG,DEFAULT_AVATAR} from "../../api/const";
import Card from '../../common_component/Card';
import {Link} from 'react-router-dom';
import Loadings from '../../common_component/Loadings'
import CourseListItem from '../../common_component/MediaItem/CourseListItem';

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
export class RankingItemGold extends  React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className="rank-card gold">
        <div className="num-container">
          <div className="label">考勤</div>
          <div className="num">{this.props.punch}</div>
        </div>
        <div className="medal-container">
          <img className="edin-bg" src="./img/edin_gold.svg"/>
          <img className="medal" src={this.props.avatar?this.props.avatar:DEFAULT_AVATAR}/>
          <div className="name">{this.props.nickname}</div>
        </div>
        <div className="num-container">
          <div className="label">正确率</div>
          <div className="num">{this.props.accuracy+'%'}</div>
        </div>
        <div className="rank-num">1</div>

      </div>
    )
  }
}
export class RankingItemCard extends  React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className={"rank-card "+this.props.type}>
        <div className="medal-container">
          <img className="edin-bg" src={"./img/edin_"+this.props.type+".svg"}/>
          <img className="medal" src={this.props.avatar?this.props.avatar:DEFAULT_AVATAR}/>
        </div>
        <div className="num">{this.props.punch+'/'+this.props.accuracy+'%'}</div>
        <div className="name">{this.props.nickname}</div>
        <div className="rank-num">{this.props.type=='silver'?2:3}</div>
      </div>
    )
  }
}
export class RankingItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className="ranking-item">
        <div className="left">
          <div className="rank">{this.props.rank}</div>
          <Avatar src={this.props.avatar}/>
          <div className="name">{this.props.name}</div>
        </div>
        <div className="right">
          <div className="num">{this.props.num}</div>
        </div>
      </div>
    )
  }
}

export default class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      show_qr_mask: false
    }
  }

  componentDidMount(){
    const {actions} = this.props;
    const course_id = this.props.match.params.course_id;
    actions.fetchCourseRankList(course_id,50,'punch');
    $(window).scrollTo(0);
  }

  hideQRMask(){
    this.setState({show_qr_mask:false});
  }
  showQRMask(){
    this.setState({show_qr_mask:true});
  }
  render() {
    const {cur_course,course_rank_list,fetching_course_rank_list} = this.props;
    const {show_qr_mask} = this.state;
    let rank_list_items;
    let goldItem,silverItem,copperItem;
    if (course_rank_list && course_rank_list.length>3){
      let d = course_rank_list[0];
      let e = course_rank_list[1];
      let f = course_rank_list[2];
      goldItem =  (
         <RankingItemGold
            avatar={d.headimgurl}
            nickname={d.nickname}
            punch={d.punch}
            accuracy={d.quiz_accuracy}
         />
        );
      silverItem = (
        <RankingItemCard
          avatar={e.headimgurl}
          nickname={e.nickname}
          punch={e.punch}
          accuracy={e.quiz_accuracy}
          type="silver"
        />
      );
      copperItem = (
        <RankingItemCard
          avatar={f.headimgurl}
          nickname={f.nickname}
          punch={f.punch}
          accuracy={f.quiz_accuracy}
          type="copper"
        />
      );
    }
    if (course_rank_list && course_rank_list.length){
      rank_list_items = course_rank_list.map(function(d,i){
        if(d.nickname) {
          return (
            <RankingItem
              avatar={d.headimgurl}
              name={d.nickname}
              num={d.punch+'/'+d.quiz_accuracy +'%'}
              type="punch"
              rank={i+1}
              key={i}

            />
          )
        }
      })
    }
    if (cur_course.uuid) {
      return (
        <div className="class">
          <Link to={'/user-course-info/'+cur_course.uuid}>
            <Card className="course-list-item" bg={cur_course.picture?ROOT_URL+cur_course.picture:DEFAULT_COURSE_BG}>
                 <div className="name">
                  {cur_course.name}
                </div>
              <div className="time">
                {cur_course.begdt +'-' +cur_course.enddt}
              </div>
              <div className="intro-info">
                点击查看课程介绍
              </div>
            </Card>
          </Link>
          <div className="content">
          <div className="assistant">
            <h3><b>助教</b></h3>
            <div className="assistant-item">
              <div className="left">
                <Avatar size="md"
                        src={cur_course.assistant && cur_course.assistant.avatar?ROOT_URL+cur_course.assistant.avatar:ROOT_URL+'pic/avatar/assistant.jpg'}/>
                <div className="name">{cur_course.assistant?cur_course.assistant.name:''}</div>
              </div>
              <Button size="sm" onClick={this.showQRMask.bind(this)}>添加好友</Button>
            </div>
          </div>
          <div className="member">
            <div className="members">
              <div className="user-list">
                <Avatar className="user-item"
                        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2381740074,3012066882&fm=27&gp=0.jpg"/>
                <Avatar className="user-item"
                        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2381740074,3012066882&fm=27&gp=0.jpg"/>
                <Avatar className="user-item"
                        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2381740074,3012066882&fm=27&gp=0.jpg"/>
              </div>
              <div className="user-number">123人</div>
            </div>
          </div>
          <div className="ranking">
            <h3><b>排行榜</b></h3>
            <div className="rank-card-container">
              {goldItem}

              <div className="pure-g">
                <div className="pure-u-md-1-2">
                  {silverItem}
                </div>
                <div className="pure-u-md-1-2">
                  {copperItem}
                </div>
              </div>
            </div>
            <div className="ranking-list">
              {fetching_course_rank_list?(<Loadings show/>):rank_list_items}
            </div>
          </div>
          {show_qr_mask?<QRMask assistant={cur_course.assistant} onClick={this.hideQRMask.bind(this)}/>:null}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
