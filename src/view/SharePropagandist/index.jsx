import React from 'react';
import ReactDOM from 'react-dom';
import Loadings from '../../common_component/Loadings';
import Button from '../../common_component/Button';
import {Link} from 'react-router-dom';
import TextField from '../../common_component/TextField';

import { BASIC_URL, INTRO_URL,FOLLOW_URL } from "../../api/const";
import './style.scss';

export default class SharePropagandist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imgLoaded: false,
      imgLoaded2: false,
      qrLoaded: false,
      qrLoaded2: false,
      source: '',
      shouldDraw: false,
    }
  }

  drawInvitationImage(){
     let canvas = ReactDOM.findDOMNode(this.refs.invitationCanvas);
    let image = ReactDOM.findDOMNode(this.refs.invitationImg);
    let ctx = canvas.getContext("2d");
    let o = this;
    let imgSrc = './img/share_propagandist.png';
    //let qrSrc = './img/qr.png';

    let img = new Image();
    let qrImg = new Image();
    let width = 375;
    let height = 628;
    let nameFont = '500 20px Microsoft Yahei';
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
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.save();
      o.setState({imgLoaded: true});
    }
  }

  drawFollowImage(){
    let canvas = ReactDOM.findDOMNode(this.refs.followCanvas);
    let image = ReactDOM.findDOMNode(this.refs.followImg);
    let ctx = canvas.getContext("2d");
    let o = this;
    let imgSrc = './img/follow_img.png';
    //let qrSrc = './img/qr.png';

    let img = new Image();
    let qrImg = new Image();
    let width = 188;
    let height = 294;
    let strDataURI = '';

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.height = height * 2;
    canvas.width = width * 2;
    ctx.scale(2, 2);
    img.src = imgSrc;
    img.onload = drawImage;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,width,height);
    function drawImage(){
      ctx.drawImage(this, 0,0,width,height);
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.save();
      o.setState({imgLoaded2: true});

    }
  }

  componentDidMount(){
   this.drawFollowImage();
   this.drawInvitationImage();
  }
  drawCard(){
    this.setState({qrLoaded:false, qrLoaded2: false, shouldDraw:true});
  }



  componentDidUpdate(){
     console.log('Invitation did update');
    const {imgLoaded,imgLoaded2,qrLoaded,qrLoaded2,shouldDraw,source} = this.state;
    //const {invitation_code} = this.props.user;
    let canvas = ReactDOM.findDOMNode(this.refs.invitationCanvas);
    let canvas2 = ReactDOM.findDOMNode(this.refs.followCanvas);
    let ctx = canvas.getContext("2d");
    let ctx2 = canvas2.getContext("2d");
    if(!qrLoaded && shouldDraw){
      let propagandaUrl = INTRO_URL+'?source='+source;

      let qrSrc = BASIC_URL+'qr/?text='+encodeURIComponent(propagandaUrl);
      let o = this;
      let qrImg = new Image();
      qrImg.src = qrSrc;
      qrImg.onload = drawQR;

     let size = 185;
      ctx.fillStyle = '#fff';
      ctx.fillRect((375-size)/2+3,328,size,size);
      function drawQR(){
        let size = 185;
        ctx.drawImage(this, (375-size)/2+3,328,size,size);

        o.setState({qrLoaded: true})
      }
    }
    if(!qrLoaded2 && shouldDraw){
      let followUrl = FOLLOW_URL+'?source='+source;

      let qrSrc = BASIC_URL+'qr/?text='+encodeURIComponent(followUrl);
      let o = this;
      let qrImg = new Image();
      qrImg.src = qrSrc;
      qrImg.onload = drawQR2;

      let size = 185;
      ctx2.fillStyle = '#fff';
      ctx2.fillRect((188-size)/2,2,size,size);
      function drawQR2(){
        let size = 185;
        ctx2.fillStyle = '#fff';

        ctx2.drawImage(this, (188-size)/2,2,size,size);
        ctx2.fillRect(this,(188-size)/2,2,size,size);
        o.setState({qrLoaded2: true})
      }
    }

    if(imgLoaded && qrLoaded && shouldDraw){
     let image = ReactDOM.findDOMNode(this.refs.invitationImg);
     //this.setState({shouldDraw: false})
     let strDataURI = canvas.toDataURL("image/jpeg");
     $(canvas).css('display','none');
     $(image).attr('src',strDataURI);
     $(image).css('display','block');
    }
    if(imgLoaded2 && qrLoaded2 && shouldDraw){
       let image = ReactDOM.findDOMNode(this.refs.followImg);
       //this.setState({shouldDraw: false})
       let strDataURI = canvas2.toDataURL("image/jpeg");
       $(canvas2).css('display','none');
       $(image).attr('src',strDataURI);
       $(image).css('display','block');
    }
  }
  textInput(d){
    this.setState({source:d, shouldDraw:false});
  }

  render() {
    console.log('Invitation render');
    const isLoaded = this.state.imgLoaded;
    const propagandaUrl = INTRO_URL+'?source='+this.state.source;
    return (
      <div className="share-propagandist" onClick={this.props.onClick}>
        <TextField onInput={this.textInput.bind(this)} value={this.state.source} label="??????source???"/>
        <br/>
        <Button onClick={this.drawCard.bind(this)}>??????</Button>
        <br/>
        <canvas ref='invitationCanvas'/>
        <canvas ref='followCanvas'/>
        <h3><b>??????????????????</b></h3>
        <div>
          <a href={propagandaUrl}>{propagandaUrl}</a>
        </div>
        <div className="img-container">
          <h3><b>??????????????????</b></h3>
          <img ref='invitationImg' className="invitation-img"/>
          <h3><b>????????????????????????</b></h3>
          <img ref='followImg' className="follow-img"/>
        </div>

        <div id="qrcode" style={{display: 'none'}}></div>
        <Loadings show={!isLoaded}/>
        <div className="info">
          <h3><b>source????????????</b></h3>
          <p>???????????????????????????/????????????????????????????????????source????????????</p>
          <ul>
            <li>????????????????????????self_article-{'{????????????}'}</li>
            <li>???????????????????????????????????????????????????self_platform</li>
            <li>h5 app???????????????self_app</li>
            <li>??????????????????????????????weixin-{'{???????????????}'}</li>
            <li>???????????????zhihu-{'{????????????}'}</li>
            <li>??????????????????invitation_card</li>
            <li>?????????????????????invitation_link</li>
            <li>???????????????user_share</li>
            <li>??????????????????admission_note</li>
          </ul>
          <p>
            ???????????????/???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????_,
            ???6???13?????????????????????self_article-061302???
            ??????????????????zhihu-yuzhouqiyuan,
            ????????????????????????????????????weixin-xueshunxs
          </p>
        </div>
        </div>


    );
  }
}


