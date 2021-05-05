import React from 'react';
import ReactDOM from 'react-dom';
import { ROOT_URL } from "../../api/const";
import Loadings from '../../common_component/Loadings';
import './style.scss';

export default class ShareImage extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      logoImageLoaded: false,
      headImageLoaded: false,
      footerImageLoaded: false,
      fontLoaded: false,
      day: 100,
      imgSrc: 'img/day100.jpg',
      imgInfo: '图 / Goodbye, Have a Nice Journey!! / Jim Nutt',
      title: '最后一课',
      text: '再见，为了再见。'
    }
  }

  drawImage(imgSrc,imgInfo,title,desc,course,day_num){
    let canvas = ReactDOM.findDOMNode(this.refs.canvas);
    let ctx=canvas.getContext("2d");
    let imgSize = 300;
    let width = 375;
    let height = 667;
    let imgCenterX = width/2;
    let imgCenterY =  imgSize/2 + 100;
    let img =new Image();
    let logoSrc = 'img/logo_b.png';
    let logoImg = new Image();
    let footerSrc ='img/footer.png';
    let adSrc = 'img/adGis.png';
    let footerImg = new Image();
    let enFont = "56px Futura-Condensed2f9409db1a635";
    let chFontBold = 'bold 20px Microsoft YaHei';
    let textFont = '200 18px Microsoft Yahei';
    let imgInfoFont = '200 13px Microsoft Yahei';
    let logoSize = 35;
    let o = this;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.height = height * 2;
    canvas.width = width * 2;
    ctx.scale(2, 2);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,width,height);
    logoImg.src = logoSrc;
    logoImg.onload = drawLogoImage;
    logoImg.setAttribute('crossOrigin', 'anonymous');
    img.src = imgSrc;
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = drawHeadImage;
    footerImg.src = footerSrc;
    footerImg.setAttribute('crossOrigin', 'anonymous');
    footerImg.onload = drawFooterImage;

    function drawFooterImage(){
      ctx.drawImage(this, 85,597,200,45);
      o.setState({footerImageLoaded:true})
    }
    function drawLogoImage(){
      // ctx.save();
      ctx.drawImage(this, (width-logoSize)/2, 35,logoSize,logoSize);
      ctx.strokeStyle = '#ccc';
      ctx.beginPath();
      ctx.moveTo(40,52);
      ctx.lineTo((width-logoSize)/2 - 20,52);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo((width+logoSize)/2 + 20,52);
      ctx.lineTo(width-40,52);
      ctx.stroke();
      ctx.closePath();
      ctx.save();
      o.setState({logoImageLoaded:true})
      // ctx.restore();
    }

    function drawHeadImage() {
      let imgWidth = this.width;
      let imgHeight = this.height;
      if(this.height > this.width){
          imgWidth = 350;
          imgHeight = imgWidth* this.height/this.width;
      }
      else{
          imgHeight = 350;
          imgWidth = imgHeight* this.width/this.height;
      }
      // ctx.drawImage(this, 0, 0);
      ctx.save();
      ctx.arc(imgCenterX,imgCenterY,imgSize/2,0,2*Math.PI);
      ctx.clip();
      ctx.drawImage(this,(width-imgWidth)/2,imgCenterY-imgHeight/2,imgWidth,imgHeight);
      if(course!='course1') {
        ctx.fillStyle = "rgba(140,137,126,0.4)";
        ctx.arc(imgCenterX, imgCenterY, imgSize / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = enFont;
        ctx.textAlign = "center";
        ctx.fillText("DAY" + day_num, imgCenterX + 5, imgCenterY + 15);
      }
      ctx.closePath();
      ctx.restore();
      ctx.save();
      o.setState({headImageLoaded:true})
    }
    ctx.textAlign="center";
    ctx.fillStyle = '#555';
    ctx.font = chFontBold;
    ctx.fillText(title, width/2, 447);
    ctx.fillStyle = "#888";
    ctx.font = textFont;
    ctx.textAlign="center";
    if(desc){
      let lines = desc.split('\n');
      for(let i=0;i<lines.length;i++){
        ctx.fillText(lines[i], width/2,484+i*24);
      }
    }

    ctx.textAlign="center";
    ctx.fillStyle = "#888";
    ctx.font = imgInfoFont;
    if (imgInfo) {
      ctx.fillText('题图/'+imgInfo, width/2,538);
    }

    ctx.fillStyle = '#333';
    ctx.fillRect(0,height-100,width,100);
  }

  componentDidMount(){
    console.log('ShareImage did mount');
    const lesson_id = this.props.match.params.lesson_id;
    const {actions} = this.props;
    if(lesson_id) {
      actions.fetchLesson(lesson_id);
    }
  }

  componentWillReceiveProps(nextProps){
    console.log('ShareImage will receive props');
    const lesson_id = this.props.match.params.lesson_id;
    const cur_lesson_id = nextProps.lesson_info.id;
    if(cur_lesson_id && lesson_id == cur_lesson_id) {
      const {picture,day_num,name,desc,picture_caption,course} = nextProps.lesson_info;
      this.drawImage(ROOT_URL+picture,picture_caption,name,desc,course,day_num);
    }
  }

  componentDidUpdate(){
    console.log('ShareImage did update');
    let canvas = ReactDOM.findDOMNode(this.refs.canvas);
    let imgDom = ReactDOM.findDOMNode(this.refs.canvasImg);
    if(this.state.logoImageLoaded && this.state.headImageLoaded && this.state.footerImageLoaded){
      //imgDom.crossOrigin = "Anonymous";
      let strDataURI = canvas.toDataURL("image/jpeg");
      imgDom.src = strDataURI;
    }
  }
  render() {
    console.log('ShareImage render');
    let loaded= (this.state.logoImageLoaded && this.state.headImageLoaded && this.state.footerImageLoaded)
    return (
      <div className="share-image">
        <div className="canvas-container">
          <canvas width={360} height={667} ref="canvas"></canvas>
        </div>
        <div className="canvas-img-container">
          <img  className="canvas-img" ref="canvasImg"/>
        </div>
        <div className="save-info">
          长按图片保存或发送好友
        </div>
        <Loadings show={!loaded}/>
      </div>
    );
  }
}
