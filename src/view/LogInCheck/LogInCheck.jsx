import React from 'react';
import {BASIC_URL,LOG_URL} from "../../api/const";
import {createToken} from "../../utils/auth_helper";
import Button from '../../common_component/Button'
import './style.scss';
/**
 * Logincheck 界面用于登陆授权
 * **/
export default class LogInCheck extends React.Component {

  constructor(props) {
    super(props);
  }
  handleClaim(){
    const {match,actions} = this.props;
    const token = match.params.token;
    actions.claimToken(token)
  }
  render() {
    console.log('Log In render');
    const {claim_token}  = this.props;
    return (
        !claim_token?(
          <div className='log-in-check'>
            <p>其他设备/浏览器正在请求<br/>登陆您的知道人文账号</p>
            <Button onClick={this.handleClaim.bind(this)}>确认授权</Button>
          </div>
        ):(
          <div className='log-in-check'>
            已经授权，请在其他设备上查看....
          </div>
        )
    )
  }
}
