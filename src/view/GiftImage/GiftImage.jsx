import React from 'react';
import ReactDom from 'react-dom';
import Loadings from '../../common_component/Loadings';
import {ROOT_URL,BASIC_URL,INTRO_URL,RECEIVE_GIFT_URL} from "../../api/const";
import './style.scss';

function getTrueLength(str){//获取字符串的真实长度（字节长度）
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
  function cutString(str, leng){//按字节长度截取字符串，返回substr截取位置
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
  function getEndPos(text,lh,ph,rw,sPos){
      let i=1;
      let textList = text.split("\n");
      let endPosY = sPos[1];
        for(let n=0;n<textList.length;n++){
            let text = textList[n];
            if(getTrueLength(text)){
                endPosY+=ph;
            }
            for(; getTrueLength(text) > 0; i++){
                let tl = cutString(text, rw);
                console.log(text.substr(0, tl));
                text = text.substr(tl);
                endPosY+=lh;
            }

        }
     // let ePosY = i * lh + sPos[1];
      return endPosY;
  }
  function writeTextOnCanvas(canvas, lh, rw, text,font,color,sPos){
        //let cns = document.getElementById(cns);
        let ctx = canvas.getContext("2d");
        let lineheight = lh;
        //ctx.scale(2, 2);
        console.log('text');
        console.log(text);
        ctx.font = font;

        let i=1;
        let textList = text.split("\n");
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
    function rescaleCanvas(canvas,ctx,width,height,scale){
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      canvas.height = height * scale;
      canvas.width = width * scale;
    }
export default class GiftImage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      to:'小贱',
      text:"祝你新年快乐万事如意祝你新年快乐万事如意祝你新年快乐万事如意",
      inviter_nickname:'A君',
      qrSrc:'./img/qr.png',
      footerTextImageLoaded:false,
      qrImageLoaded: false,
      splitImageLoaded:false
    }
  }

  drawImage(to,text,inviter_nickname,uuid,price,name){

      let canvas = ReactDom.findDOMNode(this.refs.canvas);
      let lh = 32;
      let ph = 14;
      let rw = 24;
      let sPos = [60,80];
      let ctx=canvas.getContext("2d");
      let width = 375;
      let height = getEndPos(text,lh,ph,rw,sPos)+470;

      let font_family = "Hiragino Sans GB,Heiti SC,PingFang SC,STHeiti,LiHei Pro Light,STXihei,Microsoft YaHei";
      let font="bold 22px "+font_family;
      let nameFont = 'bold 24px '+font_family;
      let infoFont = '16px '+ font_family
      let hintFont = '13px '+ font_family
      let backgroundColor = '#c6554a';
      let fontColor ="#fff";
      let strokeColor = 'rgba(255,255,255,0.3)';
      let contextMargin  = 15;
      let splitImage = new Image();
      let splitImageSrc = './img/gift/spliter.png';
      let footerTextImage = new Image();
      let footerTextSrc = './img/gift/footer_text.png';
      let qrImage = new Image();
      const giftUrl =  RECEIVE_GIFT_URL+uuid;
      const qrSrc = BASIC_URL+'qr/?text='+encodeURIComponent(giftUrl);
      let o = this;


      rescaleCanvas(canvas,ctx,width,height,2);
      ctx.scale(2, 2);

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0,0,width,height);

      ctx.strokeStyle = strokeColor;
      ctx.strokeRect(contextMargin,contextMargin,width-2*contextMargin,height-2*contextMargin);

      ctx.font = nameFont;
      ctx.fillStyle = fontColor;
      ctx.fillText(to+':',sPos[0],sPos[1]);





      let ePos = writeTextOnCanvas(canvas, lh, rw, text,font,fontColor,[sPos[0],sPos[1]+20]);


      splitImage.src = splitImageSrc;
      splitImage.onload = drawSplit;

      function drawSplit(){
        ctx.drawImage(this, 40,ePos+5,292,69);
        o.setState({splitImageLoaded:true})
      }


      qrImage.src = qrSrc;
      qrImage.onload = drawQR;



      function drawQR(){
        let qrWidth = 120;
        let qrBoundWidth = 120;
        ctx.fillStyle='#fff';
        ctx.fillRect((width-qrBoundWidth)/2,ePos+240-(qrBoundWidth-qrWidth)/2,qrBoundWidth,qrBoundWidth);
        ctx.drawImage(this, (width-qrWidth)/2,ePos+240,qrWidth,qrWidth);
        o.setState({qrImageLoaded:true})
      }

      ctx.textAlign = 'center';
      ctx.font = nameFont;
      ctx.fillText(inviter_nickname,width/2,ePos+120);
      ctx.font = infoFont;
      ctx.fillText('在知道人文上',width/2,ePos + 160)
      ctx.fillText('为你购买了价值'+price+'元的',width/2,ePos + 185);
      ctx.fillText(name,width/2,ePos+210)
      ctx.font = hintFont
      ctx.opacity = 0.6;
      ctx.fillText('扫码接受赠送，领取课程',width/2,ePos+400)
      //ctx.fillText('在知道人文上')
  }

  componentDidMount(){
      const {to,text,inviter_nickname,inviter,is_usable,uuid,receiver,product} = this.props.cur_gift.cur_gift;
      const {history,actions} = this.props;
      const giftId = this.props.match.params.id;
      if(!inviter){
        actions.fetchCurGift(giftId);
      }
      else if(!text || !is_usable && !receiver){
        history.replace('/gift');
      }else{
        actions.fetchProductDetail(product);
      }
  }
  componentWillReceiveProps(nextProps){
    const {cur_gift,fetching_cur_gift} = nextProps.cur_gift;
    const {cur_product, fetching_product_item} = nextProps.cur_product;
    const {to,text,inviter_nickname,inviter,is_usable,uuid,receiver,product} = cur_gift;
    const {history,actions} = nextProps;
    if(inviter) {
      if (!text || !is_usable && !receiver) {
        history.replace('/gift');
      } else {
        //获取到了产品信息
        if(!fetching_product_item && this.props.cur_product.fetching_product_item){
           this.drawImage(to, text, inviter_nickname,uuid,cur_product.price,cur_product.name);
        }
        //获取到了礼品信息
        if(!fetching_cur_gift && this.props.cur_gift.fetching_cur_gift){
          actions.fetchProductDetail(product);
        }

      }
    }
  }

  componentDidUpdate(){
      let canvas = ReactDom.findDOMNode(this.refs.canvas);
      let canvasContainer = ReactDom.findDOMNode(this.refs.canvasContainer);
      let imgDom = ReactDom.findDOMNode(this.refs.canvasImg);
      let canvasImgContainer = ReactDom.findDOMNode(this.refs.canvasImgContainer);

      if(this.state.splitImageLoaded && this.state.qrImageLoaded ){
           //imgDom.crossOrigin = "Anonymous";
           let strDataURI = canvas.toDataURL("image/jpeg");
           $(canvasContainer).css({display:'none'});
           $(imgDom).css({display:'block'});
           imgDom.src = strDataURI;

      }

  }
  render() {
    let loaded= this.state.splitImageLoaded && this.state.qrImageLoaded;
    const {receiver,receiver_nickname} = this.props.cur_gift;
    return (
      <div className="gift-img theme-red">
          <div className="canvas-container" ref="canvasContainer">
            <canvas width={360} height={667} ref="canvas"></canvas>
          </div>
          <img  className="canvas-img" ref="canvasImg"/>
          <div className="save-info">
            {receiver?'您的赠送已被好友'+receiver_nickname+'使用':'请保存上图并发送给您要赠送好友'}
          </div>
          <Loadings show={!loaded}/>
      </div>
    );
  }
}
