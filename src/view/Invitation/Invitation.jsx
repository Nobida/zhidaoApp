import React from 'react';
import ReactDOM from 'react-dom';
import Loadings from '../../common_component/Loadings';
import Button from '../../common_component/Button';
import {Link} from 'react-router-dom';
import { BASIC_URL, INTRO_URL } from "../../api/const";
import {getCourseIndex} from "../../utils/lesson_helper";
import './style.scss';

class InvitationCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imgLoaded: false,
      qrLoaded: false,
    }
  }

  componentDidMount(){
    console.log('Invitation did mount');
    const nickname = this.props.user.nickname;

    let canvas = ReactDOM.findDOMNode(this.refs.invitationCanvas);
    let image = ReactDOM.findDOMNode(this.refs.invitationImg);
    let ctx = canvas.getContext("2d");
    let o = this;
    let imgSrc = './img/invitation4.png';
    //let qrSrc = './img/qr.png';

    let img = new Image();
    let qrImg = new Image();
    let width = 375;
    let height = 600;
    let nameFont = '500 20px Microsoft Yahei';
    let courseFont = '600 16px Microsoft Yahei'
    let descFont = '500 14px Microsoft Yahei';
    let dateFont = '10px Microsoft Yahei';
    let strDataURI = '';

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.height = height * 2;
    canvas.width = width * 2;
    ctx.scale(2, 2);
    img.src = imgSrc;
    img.onload = drawImage;

    function drawImage(){
      ctx.drawImage(this, 0,0,width,height);
      ctx.font = nameFont;
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.save();
      ctx.fillText(nickname,width/2,330);
      if(o.props.course && o.props.course.name){
        ctx.font = courseFont;
        ctx.fillText(o.props.course.name, width/2, 390);
      }
      ctx.font = descFont;
      if(o.props.course && o.props.course.invitation_discount){
          ctx.fillText('扫描二维码享受课程报名' + o.props.course.invitation_discount + '元优惠', width / 2, 550);
      }else{  
        ctx.fillText('扫描二维码报名课程',width/2, 560);
      }
      o.setState({imgLoaded: true});
    }
  }

  componentDidUpdate(){
    console.log('Invitation did update');
    const {imgLoaded,qrLoaded} = this.state;
    const {invitation_code} = this.props.user;
    let canvas = ReactDOM.findDOMNode(this.refs.invitationCanvas);
    let ctx = canvas.getContext("2d");
    if(imgLoaded && !qrLoaded){ 
      let propagandaUrl = this.props.course&&this.props.course.name?this.props.course.ad_url:INTRO_URL;
      if(invitation_code){
        propagandaUrl+='?invitation_code='+invitation_code+"&source=invitation_card";
      }
      let qrSrc = BASIC_URL+'qr/?text='+encodeURIComponent(propagandaUrl);
      let o = this;
      let qrImg = new Image();
      qrImg.src = qrSrc;
      qrImg.onload = drawQR;
      function drawQR(){
        ctx.fillStyle = '#fff';
        ctx.fillRect(142,420,91,91);
        ctx.drawImage(this, 140,418,95,95);
        o.setState({qrLoaded: true})
      }
    }
    if(imgLoaded && qrLoaded){
       let image = ReactDOM.findDOMNode(this.refs.invitationImg);
       let strDataURI = canvas.toDataURL("image/jpeg");
       $(canvas).css('display','none');
       $(image).attr('src',strDataURI);
       $(image).css('display','block');
    }
  }

  render() {
    console.log('Invitation render');
    const isLoaded = this.state.qrLoaded && this.state.imgLoaded;
    return (
      <div className="invitation-card" onClick={this.props.onClick}>
        <canvas ref='invitationCanvas'/>
        <img ref='invitationImg' className="invitation-img"/>
        <div id="qrcode" style={{display: 'none'}}></div>
        <Loadings show={!isLoaded}/>
        <div className="bottom-info">
          请长按保存邀请卡后分享
        </div>
      </div>
    );
  }
}
class ShareLead extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className="share-lead" onClick={this.props.onClick}>
        <h2>邀请好友</h2>
        <img className="lead-img" src="img/share-lead.png"/>
        <br/>
        <p>点击右上角分享好友</p>
        <img className="share-arrow" src="img/share-arrow.png"/>
      </div>
    )
  }

}
export  default  class Invitation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showShareLead: false,
        showInvitationCard: false
      }
    }
    hideAllMask(){
      this.setState({
        showShareLead: false,
        showInvitationCard: false
      })
    }
    showShareLead(){
      this.setState({
        showShareLead: true,
      })
    }
    showInvitationCard(){
      this.setState({
        showInvitationCard: true,
      })
    }
    componentWillReceiveProps(nextProps){
      const {cur_course,actions} = nextProps;
      if(!cur_course.fetching_course && this.props.cur_course.fetching_course){
        actions.setAdSharePage();
      }  
    }  
    componentWillUnmount(){
      const {actions} = this.props;
      actions.setDefaultSharePage();
    }
    componentDidMount(){
      const course_id = this.props.match.params.course_id;  
      const actions = this.props.actions;
      if(!course_id){
        actions.setDefaultSharePage();
      }else {  
          actions.fetchCourseByID(course_id);
      }
    }
    render(){
      const course_id = this.props.match.params.course_id;
      const cur_course = this.props.cur_course.course;  
       return (
         <div className="invitation">
            <div className="invitation-panel">
              <div className="invitation-panel-header">
                <img src="img/invitation_bg.jpg"/>
                <div className="invitation-panel-title">
                  邀请好友</div>
              </div>
              <div className="invitation-panel-content">
                { 
                  course_id&&cur_course?(
                    <p>
                      邀请好友加入<b>{cur_course.name}</b> { cur_course.invitation_discount? '，您的好友将获得'+cur_course.invitation_discount+'元减免优惠，':''}
                      {cur_course.invitation_reward?'您将获得'+cur_course.invitation_reward+'积分奖励':''}
                    </p>
                  ):(
                    <p>
                      邀请好友加入知道人文课程。
                    </p>
                  )
                }

                <br/>
                <Button onClick={this.showShareLead.bind(this)}>邀请好友</Button>
                <br/>
                <Button type="ghost" onClick={this.showInvitationCard.bind(this)}>生成图片邀请卡</Button>
                <br/>
                {/* <Link to="/store" className="store-link">去商城看看可以兑换哪些商品</Link> */}
              </div>
            </div>
           {this.state.showShareLead?(<ShareLead onClick={this.hideAllMask.bind(this)}/>):null}
           {this.state.showInvitationCard?(<InvitationCard user={this.props.user} course={cur_course} onClick={this.hideAllMask.bind(this)}/>):null}
         </div>
       )
    }
}
