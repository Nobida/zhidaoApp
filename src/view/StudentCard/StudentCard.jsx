import React from 'react';
import ReactDOM from 'react-dom';
import Loadings from '../../common_component/Loadings';
import './style.scss';


export default class StudentCard extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      bookInfo:'荷马史诗 第一讲',
      nickname:'王小贱',
      headImage:'img/day90.jpg',
      avatar:'img/avatar_test.jpg',
      time:'2017/12/31',
      dashline: 'img/dashline.svg',
      courseHeader: 'img/student_card_header.jpg',
      footer: 'img/student_card_footer.jpg',
      footerLoaded: false,
      courseHeaderLoaded: false
    }
  }

  getStudentId(){
    const {id} = this.props;
    let idStr = 'ZD';
    let idNumlen = 7;
    let idDigit = Math.ceil(Math.log(id) / Math.LN10);
    for(let i=0;i<idNumlen-idDigit;i++){
      idStr+='0'
    };
    idStr+=id;
    return idStr;
  }

  componentDidMount(){
    console.log('StudentCard did mount');

    let canvas = ReactDOM.findDOMNode(this.refs.canvas);
    let canvasContainer = ReactDOM.findDOMNode(this.refs.canvasContainer);
    let imgDom = ReactDOM.findDOMNode(this.refs.canvasImg);

    let ctx=canvas.getContext("2d");
    let {courses,nickname,id} = this.props;
    let width = 375;
    let height = 500 + 30*courses.length;
    let o = this;

    let font_family = "Hiragino Sans GB,Heiti SC,PingFang SC,STHeiti,LiHei Pro Light,STXihei,Microsoft YaHei";
    let enFont = "30px Futura-Condensed2f9409db1a635";
    let nameFont = "500 28px "+font_family;
    let descFont = "200 14px "+font_family;
    let courseFont = "200 16px "+font_family;
    let courseTimeFont = '200 12px '+font_family;
    let idStr = this.getStudentId();

    let contentMargin = 15;
    let contentPadding = 20;
    let contentTextPadding = 30;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.height = height * 2;
    canvas.width = width * 2;
    ctx.scale(2, 2);

    let grd=ctx.createLinearGradient(0,0,170,30);
    grd.addColorStop(0,"rgb(107,170,130)");
    grd.addColorStop(1,"rgb(107,162,152)");
    ctx.fillStyle=grd;
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = '#fff';
    ctx.shadowOffsetX=2;
    ctx.shadowOffsetY=2;
    ctx.shadowColor='rgba(0,0,0,0.1)';
    ctx.shadowBlur='30';

    ctx.beginPath();
    ctx.moveTo(contentMargin,contentMargin);
    ctx.lineTo(width - contentMargin, contentMargin);
    ctx.lineTo(width - contentMargin, 180);
    ctx.lineTo(width - contentMargin -10, 195);
    ctx.lineTo(width - contentMargin, 210);
    ctx.lineTo(width - contentMargin, height-contentMargin);
    ctx.lineTo(contentMargin, height-contentMargin);
    ctx.lineTo(contentMargin,210);
    ctx.lineTo(contentMargin+10,195);
    ctx.lineTo(contentMargin,180);
    ctx.lineTo(contentMargin,contentMargin);

    ctx.fill();
    ctx.closePath();

    ctx.shadowOffsetX=0;
    ctx.shadowOffsetY=0;
    ctx.shadowColor='none';
    ctx.shadowBlur= 0;

    ctx.fillStyle = '#333';
    ctx.font = nameFont;
    ctx.fillText(nickname,contentMargin+contentTextPadding,90);
    ctx.font = enFont;
    ctx.fillText(idStr,contentMargin+contentTextPadding,135);
    ctx.fillStyle = '#999';
    ctx.font = descFont;
    ctx.textAlign = 'right';
    ctx.fillText('昵称',width - contentMargin - contentTextPadding,88);
    ctx.fillText('学号',width - contentMargin - contentTextPadding,134);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#555';
    ctx.font = courseFont;
    for(let i=0;i<courses.length;i++){
      ctx.fillText(courses[i].name,contentMargin+contentTextPadding,270+i*30);
    }

    ctx.textAlign = 'right';
    ctx.fillStyle = '#999';
    ctx.font = courseTimeFont;
    for(let i=0;i<courses.length;i++){
      ctx.fillText(courses[i].begdt+' / '+courses[i].enddt,width-contentMargin-contentTextPadding,270+i*30);
    }

    let footerImg = new Image();
    footerImg.src = this.state.footer;
    footerImg.onload = drawFooterImage;
    let courseHeaderImg = new Image();
    courseHeaderImg.src = this.state.courseHeader;
    courseHeaderImg.onload = drawCourseHeader;

    function drawCourseHeader(){
      let imgWidth = width - (contentMargin + contentPadding)*2;
      ctx.save();
      ctx.drawImage(this, contentMargin+contentPadding,165,imgWidth,this.height*(imgWidth)/this.width);
      ctx.save();
      o.setState({courseHeaderLoaded:true});
    }

    function drawFooterImage(){
      let imgWidth = width - (contentMargin + contentPadding)*2;
      ctx.save();
      ctx.drawImage(this, contentMargin+contentPadding,height - 200,imgWidth,this.height*(imgWidth)/this.width);
      ctx.save();
      o.setState({footerLoaded:true});
    }
  }

  componentDidUpdate(){
    console.log('StudentCard did update');
    let canvas = ReactDOM.findDOMNode(this.refs.canvas);
    let canvasContainer = ReactDOM.findDOMNode(this.refs.canvasContainer);
    let imgDom = ReactDOM.findDOMNode(this.refs.canvasImg);
    if(this.state.footerLoaded && this.state.courseHeaderLoaded){
      let strDataURI = canvas.toDataURL("image/jpeg");
      $(canvasContainer).css({display:'none'});
      $(imgDom).css({display:'block'});
      imgDom.src = strDataURI;
    }
  }

  render() {
    console.log('StudentCard render');
    const loaded = (this.state.footerLoaded && this.state.courseHeaderLoaded);
    return (
      <div className="student-card">
        <div className="canvas-container" ref="canvasContainer">
          <canvas ref="canvas"></canvas>
        </div>
        <img className="canvas-img" ref="canvasImg"/>
        <Loadings show={!loaded}/>
        <div className="font-helper">123</div>
        <div className="save-info">
          长按保存学员卡片，按图示操作加入答疑群
        </div>
      </div>
    );
  }
}
