import React from 'react';
import Loadings from '../../common_component/Loadings';
import {checkProbationPath} from "../../utils/path_helper";
import {isWeixinBrowser} from "../../utils/wechat";
import WebLog from '../../view/WebLog';

// ApiKeyLoader保证了当它的子组件挂载时，一定可以从store.auth中获取到apikey
export default class ApiKeyLoader extends React.Component {

  componentDidMount() {
    console.log('ApiKeyLoader did mount');
    const { actions,location } = this.props;
    //存储现在的用户设备类型
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        actions.setUserAgentType('MOBILE');
    }else{
      actions.setUserAgentType('PC');
    }
    //加载试读的apikey
    // if(checkProbationPath(location)){
    //   actions.setProbationUserInfo();
    //   return;
    // }  
    if(isWeixinBrowser()) {
      actions.fetchUserInfo();
    }else{
      actions.fetchLogStatus();
    }

  }

  componentDidUpdate() {
    console.log('ApiKeyLoader did update');
    const { auth, location, history } = this.props;
    if (auth.user_info.apikey) {
      const firstPath = location.pathname.split('/')[1];
      if (location.pathname == '/') {
        // if registered and at root path
        history.replace('/main/home');
      }
    } else {
      //不是微信浏览器跳转到扫码登陆页面
      if(location.pathname != '/web-log' && !isWeixinBrowser()) {
        history.replace('/web-log');
      }
    }
  }

  render() {
    console.log('ApiKeyLoader render');
    const { auth, location, children } = this.props;
    if(location.pathname=='/web-log' ){
      return (<WebLog/>);
    }
    if (!auth.user_info.apikey || location.pathname == '/' ) {
      return (<Loadings show={true}/>);
    }
    return children;
  }
}
