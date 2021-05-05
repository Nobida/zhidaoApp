import React from 'react';
import ReactDOM from 'react-dom';
import {BASIC_URL,LOG_URL,ROOT_URL} from "../../api/const";
import {createToken} from "../../utils/auth_helper";
import './style.scss';
/**
 * WebLog 界面用于生成和轮询代码
 * **/
export default class WebLog extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      qrLoaded: false
    }
  }

  componentDidMount() {
    const {actions,auth,history} = this.props;
    if(auth.user_info.apikey){
      history.replace('/main/home');
    }else{
      const token = createToken();
      this.drawQR(token);
      actions.setToken(token);
    }
  }
  componentWillReceiveProps(nextProps) {
    const {auth, actions, history} = nextProps;
    if (!auth.user_info.apikey) {
      setTimeout(() => actions.fetchLogStatus(auth.token), 3000);
    } else {
      history.replace('/main/home');
    }
  }
  componentWillUpdate(nextProps,nextState){
    const {preQrLoaded} = this.state;
    const {qrLoaded} = nextState;
    if(qrLoaded && !preQrLoaded){
        let image = ReactDOM.findDOMNode(this.refs.qrImg);
        let canvas = ReactDOM.findDOMNode(this.refs.qrCanvas);
        // let strDataURI = canvas.toDataURL("image/jpeg");
        // $(canvas).css('display','none');
        // $(image).attr('src',strDataURI);
        // $(image).css('display','block');
    }
  }
  drawQR(token){
    const logURL = LOG_URL+token
    let canvas = ReactDOM.findDOMNode(this.refs.qrCanvas);

    let ctx = canvas.getContext("2d");
    let o = this;
    let imgSrc = BASIC_URL + 'qr/?text=' +encodeURIComponent(logURL);

    let img = new Image();
    let width = 150;
    let height = 150;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.height = height * 2;
    canvas.width = width * 2;
    ctx.scale(2, 2);
    img.src = imgSrc;
    img.onload = drawImage;
    function drawImage(){
      ctx.fillStyle='#fff'
      ctx.fillRect(0,0,width,height);
      ctx.drawImage(this, 0,0,width,height);
      o.setState({qrLoaded: true});
    }
  }
  render() {
    console.log('Web Log render');
    const agent_type = this.props.user_agent.agent_type;

    return (
      <div className='web-log'>
        <img  className='logo' src='./img/logo_b.png'/>
        <canvas ref='qrCanvas' className='qr'/>
        <img className='qr hide' ref='qrImg'/>
        {agent_type=='MOBILE'?
           (<p>请您保存此二维码并在<br/>微信中扫码登陆</p>):(
            <p>请您在微信中扫码登陆</p>
          )
        }
        {agent_type=='MOBILE'&& <img className='guide' src={ROOT_URL+'pic/guide/手机登录引导.jpg'}/>}
      </div>
    )
  }
}
