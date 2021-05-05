import React from 'react';
import ReactDom from 'react-dom';
import Loadings from '../../common_component/Loadings';
import './style.scss';


export default class ShareText extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        content:"阿基琉斯却在流泪，远远地离开\n" +
        "他的伴侣，坐在灰色大海的岸边，\n" +
        "\n" +
        "遥望那酒色的海水。他伸手向母亲祈祷：\n" +
        "\n" +
        "“母亲啊，你既然生下我这个短命的儿子，\n" +
        "\n" +
        "奥林波斯的大神，在天空鸣雷的宙斯\n" +
        "\n" +
        "就该赐我荣誉，却没有给我一点，\n" +
        "\n" +
        "那位权力广泛的阿伽门农侮辱我，\n" +
        "\n" +
        "他亲自动手，抢走我的荣誉礼物。”\n"+
        "古之欲明明德于天下者，先治其国，欲治其国者，先齐其家；欲齐其家者，先修其身；欲修其身者，先正其心；欲正其心者，先诚其意；欲诚其意者，先致其知，致知在格物。物格而后知至，知至而后意诚，意诚而后心正，心正而后身修，身修而后家齐，家齐而后国治，国治而后天下平。自天子以至于庶人，壹是皆以修身为本。其本乱而末治者，否矣。其所厚者薄，而其所薄者厚，未之有也。",
        bookInfo:'荷马史诗 第一讲',
        nickname:'王小贱',
        headImage:'img/day90.jpg',
        avatar:'img/avatar_test.jpg',
        time:'2017/12/31',
        footer:'img/share_text_footer2.jpg',
        quotation:'img/quotation.svg',
        avatarImageLoaded: false,
        footerImageLoaded: false,
        quotationImageLoaded: false,
        dashlineImageLoaded: false,
        dashline: 'img/dashline.svg',

    }
  }
  getTrueLength(str){//获取字符串的真实长度（字节长度）
            let len = str.length, truelen = 0;
            for(let x = 0; x < len; x++){
                if(str.charCodeAt(x) > 128){
                    truelen += 2;
                }else{
                    truelen += 1;
                }
            }
            return truelen;
  }
  cutString(str, leng){//按字节长度截取字符串，返回substr截取位置
            let len = str.length, tlen = len, nlen = 0;
            for(let x = 0; x < len; x++){
                if(str.charCodeAt(x) > 128){
                    if(nlen + 2 < leng){
                        nlen += 2;
                    }else{
                        tlen = x;
                        break;
                    }
                }else{
                    if(nlen + 1 < leng){
                        nlen += 1;
                    }else{
                        tlen = x;
                        break;
                    }
                }
            }
            return tlen;
  }
  getEndPos(text,lh,ph,rw,sPos){
      let i=1;
      let textList = text.split("\n");
      let endPosY = sPos[1];
        for(let n=0;n<textList.length;n++){
            let text = textList[n];
            if(this.getTrueLength(text)){
                endPosY+=ph;
            }
            for(; this.getTrueLength(text) > 0; i++){
                let tl = this.cutString(text, rw);
                console.log(text.substr(0, tl));
                text = text.substr(tl);
                endPosY+=lh;
            }

        }
     // let ePosY = i * lh + sPos[1];
      return endPosY;
  }
  writeTextOnCanvas(canvas, lh, rw, text,font,color,sPos){
        //let cns = document.getElementById(cns);
        let ctx = canvas.getContext("2d");
        let lineheight = lh;
        //ctx.scale(2, 2);
        console.log('text');
        console.log(text);
        ctx.font = font;
        ctx.fillStyle = color;



        ctx.fillStyle = '#fff';
        ctx.fillRect(0,0,375,ePos+160);
        ctx.fillStyle = '#eee';
        ctx.fillRect(0,0,375,ePos+60);
        console.log("ePos");
        console.log(ePos);

        let i=1;
        ctx.fillStyle = color;
        for(let n=0;n<textList.length;n++){
            let text = textList[n];
            for(; getTrueLength(text) > 0; i++){
                let tl = cutString(text, rw);
                console.log(text.substr(0, tl));
                ctx.fillText(text.substr(0, tl).replace(/^\s+|\s+$/, ""), sPos[0], i * lineheight + sPos[1]);
                text = text.substr(tl);
            }
        }
        return i * lineheight + sPos[1];

    }

  componentDidMount(){


      let canvas = ReactDom.findDOMNode(this.refs.canvas);
      let ctx=canvas.getContext("2d");
      let width = 375;
      let height = 667;
      let lh = 28;
      let ph = 14;
      let rw = 30;
      let font_family = "Hiragino Sans GB,Heiti SC,PingFang SC,STHeiti,LiHei Pro Light,STXihei,Microsoft YaHei";
      let font="200 16px "+font_family;
      let color ="#777";
      let sPos = [100,170];
      let text = (this.props.cur_selection.contents)?this.props.cur_selection.contents:this.state.content;
      let ePosY = -1;
      let fontBookTitle = "500 22px "+font_family;
      let dark="#555";
      let fontInfo = '200 14px '+font_family;
      let fontDesc = '200 12px '+font_family;
      let o = this;
      let lessonTitle = (this.props.lesson_info.name)?this.props.lesson_info.name:this.state.bookInfo;
      let nickname = (this.props.nickname)?this.props.nickname:this.state.nickname;
      let date = new Date();
      let dateStr = date.getFullYear()+'/'+(date.getMonth()+1)+"/"+date.getDate();

      ePosY = this.getEndPos(text,lh,ph,rw,sPos);
      height = ePosY+300;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      canvas.height = height * 2;
      canvas.width = width * 2;
      ctx.scale(2, 2);
     // ctx.fillStyle = '#eee';

      //ctx.fillRect(0,0,375,ePosY+190);
      ctx.fillStyle = '#fff';
      ctx.fillRect(0,0,375,ePosY+300);
      ctx.fillStyle = '#fff';

      ctx.fillRect(20,20,335,ePosY+300);
      console.log("ePos");
      console.log(ePosY);

      let posY=sPos[1];
      let textList = text.split("\n");
      ctx.fillStyle = color;
      ctx.font = font;
      for(let n=0;n<textList.length;n++){
            let text = textList[n];
            if(n>0 && this.getTrueLength(text)>0){
                posY+=ph;
            }
            for(; this.getTrueLength(text) > 0; ){
                let tl = this.cutString(text, rw);
                console.log(text.substr(0, tl));
                ctx.fillText(text.substr(0, tl).replace(/^\s+|\s+$/, ""), sPos[0],posY);
                posY+=lh;
                text = text.substr(tl);
            }

      }


      ctx.font = fontDesc;
      ctx.fillStyle = '#999';
      ctx.fillText(nickname,45,45);
      ctx.textAlign = 'right';
      ctx.fillText('摘录于 '+dateStr,330,45);

      ctx.textAlign = 'left';
      ctx.font = fontBookTitle;
      ctx.fillStyle = dark;

      ctx.fillText(lessonTitle,50,ePosY+50);

      ctx.font = fontInfo;
      ctx.fillStyle = '#999';
      ctx.fillText('分享自知道人文阅读推动计划',50,ePosY+75);

      function drawDashLineImage(){
          ctx.save();
          ctx.drawImage(this, 40,60,295,this.height*(295)/this.width);
          ctx.save();
          o.setState({dashlineImageLoaded:true})
      }

      function drawQuotationImage(){
          ctx.save();
          ctx.drawImage(this, 40,122,80,this.height*(80)/this.width);
          ctx.save();
          o.setState({quotationImageLoaded:true})
      }
      function drawFooterImage(){
          ctx.save();
          ctx.drawImage(this, 40,ePosY+120,375-80,this.height*(375-80)/this.width);
          ctx.save();
          o.setState({footerImageLoaded:true})
      }

      function drawHeadImage(){
         let imgWidth = this.width;
          let imgHeight = this.height;
          let xSize = 375;
          let ySize = 250;
          if(this.height*xSize/ySize > this.width){
              imgWidth = xSize;
              imgHeight = imgWidth* this.height/this.width;
          }
          else{
              imgHeight = ySize;
              imgWidth = imgHeight* this.width/this.height;
         }
 //         ctx.drawImage(this, 0, 0);
          ctx.save();
          ctx.rect(0,0,xSize,ySize);
          //ctx.arc(imgCenterX,imgCenterY,imgSize/2,0,2*Math.PI);
          ctx.clip();
          ctx.drawImage(this,0,0,imgWidth,imgHeight);
          ctx.closePath();
          ctx.save();
          o.setState({headImageLoaded:true})
      }

    //  let headImg =new Image();
     // headImg.src = this.state.headImage;
     // headImg.onload = drawHeadImage;
      let footerImg = new Image();
      footerImg.src = this.state.footer;
      footerImg.onload = drawFooterImage;

      let quotationImg = new Image();
      quotationImg.src = this.state.quotation;
      quotationImg.onload = drawQuotationImage;

      let dashlineImg = new Image();
      dashlineImg.src = this.state.dashline;
      dashlineImg.onload = drawDashLineImage;


  }
  componentDidUpdate(){
      let canvas = ReactDom.findDOMNode(this.refs.canvas);
      let canvasContainer = ReactDom.findDOMNode(this.refs.canvasContainer);
      let imgDom = ReactDom.findDOMNode(this.refs.canvasImg);
      let canvasImgContainer = ReactDom.findDOMNode(this.refs.canvasImgContainer);
      if(this.state.footerImageLoaded && this.state.quotationImageLoaded && this.state.dashlineImageLoaded){
           //imgDom.crossOrigin = "Anonymous";
           let strDataURI = canvas.toDataURL("image/jpeg");
           $(canvasContainer).css({display:'none'});
           $(imgDom).css({display:'block'});
           imgDom.src = strDataURI;
      }

  }
  render() {
    let loaded= (this.state.footerImageLoaded && this.state.quotationImageLoaded && this.state.dashlineImageLoaded);

    return (
      <div className="share-text">
          <div className="canvas-container" ref="canvasContainer">
            <canvas width={360} height={667} ref="canvas"></canvas>
          </div>
          <img  className="canvas-img" ref="canvasImg"/>
          <div className="save-info">
                  长按图片保存或发送好友
          </div>
          <Loadings show={!loaded}/>
      </div>
    );
  }
}
