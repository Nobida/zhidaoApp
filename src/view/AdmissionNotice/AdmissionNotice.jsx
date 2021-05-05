import React from 'react';
import ReactDOM from 'react-dom';
import Loadings from '../../common_component/Loadings';
import Button from '../../common_component/Button';
import {Link} from 'react-router-dom';
import { BASIC_URL, INTRO_URL, FOLLOW_URL } from "../../api/const";
import './style.scss';

export default class AdmissionNotice extends React.Component {

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
    const course_id = this.props.match.params.course_id;
    let canvas = ReactDOM.findDOMNode(this.refs.admissionCanvas);
    let image = ReactDOM.findDOMNode(this.refs.admissionImg);

    let ctx = canvas.getContext("2d");
    let o = this;
    let imgSources  = {
      'history1a':'./img/admission_notice_history.png',
      'in1001':'./img/admission_notice_classic1.png',
      'in1002':'./img/admission_notice_classic1.png',
      'default':'./img/admission_notice.png'
    }
    let imgSrc = imgSources[course_id] ? imgSources[course_id] : imgSources['default'];
    //let qrSrc = './img/qr.png';

    let img = new Image();
    let width = 361;
    let height = 571;
    let nameFont = '500 22px Microsoft Yahei';

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
      ctx.save();
      ctx.fillText(nickname+"：",50,220);
      o.setState({imgLoaded: true});
    }
  }

  componentDidUpdate(){
    console.log('Invitation did update');
    const {imgLoaded,qrLoaded} = this.state;
    let canvas = ReactDOM.findDOMNode(this.refs.admissionCanvas);
    let ctx = canvas.getContext("2d");
    const invitation_code = this.props.user.invitation_code;
    if(imgLoaded){

    }
    if(imgLoaded && !qrLoaded){
      let followUrl = FOLLOW_URL;
      if(invitation_code){
        followUrl+='?invitation_code='+invitation_code+"&source=admission_notice";
      }
      let qrSrc = BASIC_URL+'qr/?text='+encodeURIComponent(followUrl);
      let o = this;
      let qrImg = new Image();
      qrImg.src = qrSrc;
      qrImg.onload = drawQR;
      function drawQR(){
        ctx.fillStyle='#fff';
        ctx.fillRect(242,440,66,66);
        ctx.drawImage(this, 240,438,70,70);
        o.setState({qrLoaded: true})
      }
    }
    if(imgLoaded && qrLoaded){
        let image = ReactDOM.findDOMNode(this.refs.admissionImg);
        let strDataURI = canvas.toDataURL("image/jpeg");
        $(canvas).css('display','none');
        $(image).attr('src',strDataURI);
        $(image).css('display','block');
    }
  }

  render() {
    console.log('Invitation render');
    const isLoaded = this.state.imgLoaded && this.state.qrLoaded;
    return (
      <div className="admission-notice" onClick={this.props.onClick}>
        <canvas ref='admissionCanvas'/>
        <img ref='admissionImg' className="admission-img"/>
        <Loadings show={!isLoaded}/>
        <div className="bottom-info">
          请长按保存录取通知书
        </div>
      </div>
    );
  }
}