import React from 'react';
import {SwiperContainer,SwiperItem} from "../../common_component/Swiper/index";
import Button from '../../common_component/Button';
import Icon from '../../common_component/Icon';
import {ROOT_URL,DEFAULT_CARD_BG,REVIEW_CARD_COVER,WAITING_CARD_COVER} from "../../api/const";
import {Link} from 'react-router-dom';
import {check,lock,question,share,information} from '../../svg';
import {getCourseState} from "../../utils/lesson_helper";
import ShareLead from '../../common_component/ShareLead';
import { setPunchPage } from '../../utils/punchHelper';
import './style.scss';
function handleCardSwiperProgress(swiper){
  for(let i=0;i<swiper.slides.length;i++){
    let slide=swiper.slides[i]
    let d=slide.progress
    let scale = 1-Math.min(Math.abs(.1*d),1)
    let es=slide.style
    es.opacity=1-Math.min(Math.abs(d/2),1)
    es.webkitTransform=es.MsTransform=es.msTransform=es.MozTransform=es.OTransform=es.transform="translate3d(0px,0,"+-Math.abs(150*d)+"px) scale("+scale+")"
    }
}
export default class ReadingCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lesson_state: 'ONGOING',
      show_share_lead: false,
      activeItem: 0
    }

  }
  checkQuizCardStatus(quiz){
    const {lesson_quiz_status} = this.props;
    const quizes = quiz.quizes;
    const {quiz_results,status} = lesson_quiz_status;
    if(status=='finished')
      return true;
    if(!quiz_results || !quizes || status=='not_punched')
      return false;
    const answered_quizes = quiz_results.map(function(d){return d.order});
    for(let i=0;i<quizes.length;i++){
      if(answered_quizes.indexOf(quizes[i])==-1)
        return false;
    }
    return true;
  }
  componentDidMount() {
    const { actions, lesson_info, cur_course } = this.props;
    const lesson_id = this.props.match.params.lesson_id;
    const course_id = this.props.match.params.course_id;
    if (lesson_id) {
      actions.clearLesson();
      actions.fetchLesson(lesson_id,course_id);
      actions.fetchLessonQuizStatus(lesson_id,course_id);
      actions.fetchUserStat();
    } else {
      if(lesson_info && lesson_info.id){
        actions.fetchLesson(lesson_info.id,course_id);
        actions.fetchUserStat();
        actions.fetchLessonQuizStatus(lesson_info.id,course_id);
      }else{
        this.setState({lesson_state:getCourseState(cur_course)});
      }
    }
    $(window).scrollTo(0);
  }
  showShareLead(){
    const { actions } = this.props;
    setPunchPage(actions.setSharePage, actions.createSharePage);
    this.setState({show_share_lead: true});
  }
  hideShareLead(){
    this.setState({show_share_lead:false});
  }
  handleSlideChange(i){
    this.setState({activeItem: i});
  }
  componentWillUnmount() {
    console.log('ReadingCard will unmount');
    const { actions } = this.props;
    actions.setDefaultSharePage();
  }
  handleHeadClick(){
    console.log('head click');
    console.log(this.state);
    this.setState({activeItem:1});
  }
  render() {
    const { lesson_info, lesson_quiz_status } = this.props;
    const course_id = this.props.match.params.course_id;
    const { lesson_state } = this.state;
    let swiper = null;
    let available = true;
    let swiperItems = [];
    if(lesson_info.part_info&&lesson_quiz_status){
      const descs = lesson_info.desc?lesson_info.desc.split('/').map(function(d,i){
        return (
          <span key={i}>
            {d}
          </span>
        )
      }):'';
      swiperItems.push(
        <SwiperItem key="head" className="card-swiper-item head-item">
          <div onClick={this.handleHeadClick.bind(this)} className="card-center">
            <div className="head-cap" >
              <div className="progress-bg"/>
              <img ref="headImgBg"/>
              <img ref="headImg" src={lesson_info.picture?ROOT_URL + lesson_info.picture:DEFAULT_CARD_BG}/>
              <div className="img-overlay"/>
              <div className="day">{'DAY'+lesson_info.day_num}</div>
            </div>
            <h4 className="head-name">{lesson_info.name}</h4>
            <p className='desc'>{descs}</p>
          </div>
        </SwiperItem>
      );
      for(let i=0;i<lesson_info.part_info.length;i++){
        if(lesson_info.part_info[i].type=='text') {
          if (available) {
            swiperItems.push(
              <SwiperItem key={i} className="card-swiper-item">
                <Link to={'/reading2/' + course_id+'/'+ lesson_info.id + '/' + lesson_info.part_info[i].id} >
                  <div className="card-num">{i + 1}</div>
                  <div className='card-content'>
                    <div className="card-name"><b>{lesson_info.part_info[i].name}</b></div>
                    <div className='card-title'>
                      {lesson_info.part_info[i].cover?lesson_info.part_info[i].cover.title:''}
                    </div>
                    {lesson_info.part_info[i].cover&&lesson_info.part_info[i].cover.img?(
                      <div className="card-img">
                        <img src={ROOT_URL+lesson_info.part_info[i].cover.img}/>
                      </div>
                    ):null}
                    <div className='card-line'>
                      <p className='text-muted'>
                        {lesson_info.part_info[i].cover?lesson_info.part_info[i].cover.line + '...':''}
                      </p>
                    </div>
                    <div className="read-btn"> 点击进入阅读 ></div>
                  </div>
                </Link>
              </SwiperItem>
            );
          }else{
            swiperItems.push(
              <SwiperItem key={i} className="card-swiper-item card-center">
                <div className="card-num">{i + 1}</div>
                <div className="lock-icon">{lock}</div>
                <div className="info">
                  答题后查看 <b>{lesson_info.part_info[i].name}</b>
                </div>
              </SwiperItem>
            );
          }
        }
        if(lesson_info.part_info[i].type=='quiz'){
          if(available && !this.checkQuizCardStatus(lesson_info.part_info[i])) {
            available = false;
            swiperItems.push(
              <SwiperItem key={i} className="card-swiper-item card-center">
                <Link to={'/reading2/' + course_id +'/'+lesson_info.id + '/' + lesson_info.part_info[i].id} className="card-center">
                  <div className="card-num">{i + 1}</div>
                    <div className="question-icon">{question}</div>
                    <br/>
                    <Button>去做题</Button>
                </Link>
              </SwiperItem>
            );
          }
          else if(!available){
            swiperItems.push(
              <SwiperItem key={i} className="card-swiper-item card-center">
                <div className="card-num">{i + 1}</div>
                <div className="lock-icon">{lock}</div>
                <div className="info">
                  答题后查看 <b>{lesson_info.part_info[i].name}</b>
                </div>
              </SwiperItem>
            );
          }
          else if(available && this.checkQuizCardStatus(lesson_info.part_info[i])) {
            swiperItems.push(
              <SwiperItem key={i} className="card-swiper-item card-center">
                <Link to={'/reading2/' + course_id+'/'+lesson_info.id + '/' + lesson_info.part_info[i].id} className="card-center">
                  <div className="card-num">{i + 1}</div>
                    <div className="question-icon">{question}</div>
                    <br/>
                    <Button>已答题，查看解析</Button>
                </Link>
              </SwiperItem>
            );
          }
        }
      }

      swiperItems.push(
          (lesson_quiz_status.status=='finished')?(
            <SwiperItem key="finish" className="card-swiper-item card-center">
             <div>{check}</div>
              <div className="check-icon">
                {check}
              </div>
              <div>今日打卡已完成</div>
              <br/>
              <Button onClick={this.showShareLead.bind(this)}>分享打卡</Button>

            </SwiperItem>
          ):(lesson_quiz_status.status=='no_quizes')?(
            <SwiperItem key="finish" className="card-swiper-item card-center">
             <div>{check}</div>
              <div className="check-icon">
                {check}
              </div>
              <div>今日打卡自动完成</div>
              <br/>
              <Button onClick={this.showShareLead.bind(this)}>分享打卡</Button>

            </SwiperItem>
          ):(
            <SwiperItem key="finish" className="card-swiper-item card-center">
             <div>{check}</div>
              <div className="not-check-icon">
                {information}
              </div>
              <div>今日打卡未完成</div>
            </SwiperItem>
          ));
      swiper = (
        <SwiperContainer onProgress={handleCardSwiperProgress}
                         onSlideChange={this.handleSlideChange.bind(this)}
                         activeSlide={this.state.activeItem}>
          {swiperItems}
        </SwiperContainer>)

    } else{
      if(lesson_state=='ENDED'){
        swiper = (
          <SwiperContainer onProgress={handleCardSwiperProgress}>
            <SwiperItem key="head" className="card-swiper-item head-item">
                <div className="head-cap">
                  <div className="progress-bg"/>
                  <img ref="headImgBg"/>
                  <img ref="headImg" src={REVIEW_CARD_COVER}/>
                </div>
                <h4><b>课程已结束</b></h4>
                <p className='desc'>请温习以前内容</p>
            </SwiperItem>
          </SwiperContainer>
        )
      }
      if(lesson_state=='WAITING'){
        swiper = (
          <SwiperContainer onProgress={handleCardSwiperProgress}
                           onSlideChange={this.handleSlideChange.bind(this)}
                           activeSlide={this.state.activeItem}
          >
            <SwiperItem key="head" className="card-swiper-item head-item">
                <div className="head-cap">
                  <div className="progress-bg"/>
                  <img ref="headImgBg"/>
                  <img ref="headImg" src={WAITING_CARD_COVER}/>
                </div>
                <h4><b>等待开课</b></h4>
            </SwiperItem>
          </SwiperContainer>
        )
      }
    }
    return (
      <div className="reading-card">
        {swiper}
        <Link to={'/memo/'+course_id +'/'+lesson_info.id} className="share">
          <Icon size='xs' icon={share}/><span>分享日签</span>
        </Link>
        <ShareLead show={this.state.show_share_lead} onRequestClose={this.hideShareLead.bind(this)}/>
      </div>

    );
  }
}
