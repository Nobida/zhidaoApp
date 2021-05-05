import React from 'react';
import ReactDOM from 'react-dom'; 
import { ROOT_URL,BASIC_URL,FOLLOW_URL,DEFAULT_CARD_BG,AD_PAGE_URL } from "../../api/const";
import Loadings from '../../common_component/Loadings';
import './style.scss';

export default class Memo extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      logoImageLoaded: false,
      headImageLoaded: false,
      footerImageLoaded: false,
      qrImageLoaded: false,
      fontLoaded: false,
      day: 100,
      imgSrc: 'img/day100.jpg',
      imgInfo: '图 / Goodbye, Have a Nice Journey!! / Jim Nutt',
      title: '最后一课',
      text: '再见，为了再见。'
    }
  }

  drawImage(imgSrc,imgInfo,title,desc,course,day_num,course_id,invitation_code){
    let canvas = ReactDOM.findDOMNode(this.refs.canvas);
    let ctx=canvas.getContext("2d");
    let imgSize = 300;
    let width = 375;
    let height = 667;
    let imgCenterX = width/2;
    let imgCenterY =  imgSize/2;
    let img =new Image();
    let logoSrc = 'img/memo_header.png';
    let logoImg = new Image();


    let footerImg = new Image();
    let enFont = "56px Futura-Condensed2f9409db1a635";
    let chFontBold = 'bold 20px Microsoft YaHei';
    let textFont = '200 18px Microsoft Yahei';
    let imgInfoFont = '200 16px Microsoft Yahei';
    let descFont = '200 18px Microsoft Yahei';
    let dayFont = 'bold 18px Microsoft Yahei';
    let titleFont = '500 12px Microsoft Yahei';
    let footerFont = '500 10px Microsoft Yahei';
    let logoSize = 35;
    let o = this;

    let adUrl = AD_PAGE_URL;
    adUrl+= course_id + '/?invitation_code='+invitation_code; 
    let footerSrc = 'img/share-footer2.png';
    let qrSrc = BASIC_URL+'qr/?text='+encodeURIComponent(adUrl);
    let qrImg = new Image();
    qrImg.src = qrSrc;
    qrImg.onload = drawQRImage

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.height = height * 2;
    canvas.width = width * 2;
    ctx.scale(2, 2);
    ctx.fillStyle = '#eee';
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = '#fff';
    ctx.fillRect(4,4,width-8,height-8);
    logoImg.src = logoSrc;
    logoImg.onload = drawLogoImage;
    img.src = imgSrc;
    img.onload = drawHeadImage;
    footerImg.src = footerSrc;
    footerImg.onload = drawFooterImage;

    function drawFooterImage(){
      ctx.align='center';
      ctx.drawImage(this, 0,510,width,this.height*width/this.width);
      o.setState({footerImageLoaded:true})
      this.drawQRImage
    }

    drawDayInfo();
    function drawDayInfo(){
      let day_info_h = 340;
      let padding = 20;
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.font = dayFont;
      ctx.fillText('DAY'+day_num,width/2,day_info_h +10);
      ctx.strokeStyle = '#f8f8f8';
      ctx.beginPath();
      ctx.moveTo(20,day_info_h);
      ctx.lineTo((width-logoSize)/2 - 20,day_info_h);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo((width+logoSize)/2 + 20,day_info_h);
      ctx.lineTo(width-20,day_info_h);
      ctx.stroke();
      ctx.closePath();
      ctx.save();
      o.setState({logoImageLoaded:true})
      ctx.restore();
    }
    function drawLogoImage(){
      // ctx.save();
      // ctx.drawImage(this, (width-logoSize)/2, 35,logoSize,logoSize);
      // ctx.strokeStyle = '#ccc';
      // ctx.beginPath();
      // ctx.moveTo(40,52);
      // ctx.lineTo((width-logoSize)/2 - 20,52);
      // ctx.stroke();
      // ctx.closePath();
      //
      // ctx.beginPath();
      // ctx.moveTo((width+logoSize)/2 + 20,52);
      // ctx.lineTo(width-40,52);
      // ctx.stroke();
      // ctx.closePath();
      // ctx.save();
      // o.setState({logoImageLoaded:true})
      // ctx.restore();
     // ctx.drawImage(this, 0,0,width,100);
     // o.setState({logoImageLoaded:true})
    }

    function drawQRImage(){ 
        ctx.fillStyle='#fff'; 
        //ctx.fillRect(180,440,66,66);
        ctx.drawImage(this,190,530,70,70);
        o.setState({qrImageLoaded:true})
    }

    function drawHeadImage() {
      let imgWidth = this.width;
      let imgHeight = this.height; 
      if(this.height > this.width){
          imgWidth = 375;
          imgHeight = imgWidth* this.height/this.width;
      }
      else{
          imgHeight = 375;
          imgWidth = imgHeight* this.width/this.height;
      }
      // ctx.drawImage(this, 0, 0);
      ctx.save();
      //ctx.arc(imgCenterX,imgCenterY,imgSize/2,0,2*Math.PI);
      ctx.rect(0,0,width,300);
      ctx.clip();
      ctx.drawImage(this,(width-imgWidth)/2,imgCenterY-imgHeight/2,imgWidth,imgHeight);
      if(course!='course1') {
        ctx.fillStyle = "rgba(140,137,126,0.4)";
        //ctx.arc(imgCenterX, imgCenterY, imgSize / 2, 0, 2 * Math.PI);
        ctx.rect(0,0,width,300);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = imgInfoFont;
        ctx.textAlign = "right";
        if(imgInfo)
          ctx.fillText('题图/'+imgInfo, width-30, 280);
      }
      ctx.closePath();
      ctx.restore();
      ctx.save();
      o.setState({headImageLoaded:true})
    }
    ctx.fillStyle = '#000';
    ctx.fillRect(width/2-30,450,60,3);


    ctx.textAlign="center";
    ctx.fillStyle = '#999';
    ctx.font = titleFont;

    ctx.fillText(title, width/2, 480);

    ctx.font = textFont;
    ctx.fillStyle = '#333';
    ctx.textAlign="center";
    if(desc){
      let lines = desc.split('/');
      if(lines.length==2) {
        for (let i = 0; i < lines.length; i++) {
          ctx.fillText(lines[i], width/2, 390 + i * 26);
        }
      }
      if(lines.length == 1){
        ctx.fillText(lines[0], width/2, 398);
      }
    }



  }

  componentDidMount(){
    console.log('ShareImage did mount');
    const lesson_id = this.props.match.params.lesson_id;
    const course_id = this.props.match.params.course_id;
    const {actions} = this.props;
    if(lesson_id) {
      actions.fetchLesson(lesson_id,course_id);
    }
  }

  componentWillReceiveProps(nextProps){
    console.log('ShareImage will receive props');
    const lesson_id = this.props.match.params.lesson_id;
    const cur_lesson_id = nextProps.lesson_info.id;
    console.log('memo props');
    console.log(this.props);
    console.log(nextProps)
    if(cur_lesson_id && lesson_id == cur_lesson_id) {
      const invitation_code = nextProps.invitation_code;
      const {picture,day_num,name,desc,picture_caption,course} = nextProps.lesson_info; 
      this.drawImage(picture?ROOT_URL+picture:DEFAULT_CARD_BG,picture_caption,name,desc,course,day_num,course,invitation_code);
    }
  }

  componentDidUpdate(){
    console.log('ShareImage did update');
    let canvas = ReactDOM.findDOMNode(this.refs.canvas);
    let imgDom = ReactDOM.findDOMNode(this.refs.canvasImg);
    if(this.state.headImageLoaded && this.state.footerImageLoaded){
      imgDom.crossOrigin = "Anonymous";
      let strDataURI = canvas.toDataURL("image/jpeg");
      imgDom.src = strDataURI;
    }  
  }
  render() {
    console.log('ShareImage render'); 
    let loaded= (this.state.headImageLoaded && this.state.footerImageLoaded && this.state.qrImageLoaded)
    return (
      <div className="memo">
        <div className="canvas-container">
          <canvas width={360} height={667} ref="canvas"> </canvas>
        </div>
        <div className="canvas-img-container">
          <img  className="canvas-img" ref="canvasImg"/>
        </div>
        <div className="save-info">
          长按保存日签保存并分享
        </div>
        <Loadings show={!loaded}/>
      </div>
    );
  }
}
