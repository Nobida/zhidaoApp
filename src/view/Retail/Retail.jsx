import React from 'react';
import {Link} from 'react-router-dom';
import './style.scss';
import Card from '../../common_component/Card';
import {ROOT_URL} from "../../api/const";
import Loadings from '../../common_component/Loadings'
import {NavTabContainer, NavTabItem, NavHead, NavContent} from '../../common_component/NavHead'

export default class Retail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navValue: 'retail-list'
    }
  }
  componentDidMount() {
    const paths = this.props.location.pathname.split('/');
    if(paths.length>2){
      let path_name = paths[2]
      this.setState({navValue:path_name})
      const { actions } = this.props
      actions.fetchCreditStatus();
    }
  }
  handleNavIndexChange(i,value){
    const {actions, history} = this.props;
    this.setState({navValue: value})
    history.replace('/retail/'+value);
  }


  render() {
    const { personal_credit_info } = this.props

    return ( 
      <div className="retail">
        <NavHead>  
            <NavContent className='retail-head'>
                <div className='head-content'>
                <div className='head-info'>
                    <div>
                        <div className='label'>总收入</div>
                        <div><span className='num'>{ personal_credit_info.total_credits/10 }</span>元</div>
                    </div>
                </div> 
                <div className='head-info'>
                    <div>
                        <div className='label'>已结算</div>
                        <div><span className='num'>{ personal_credit_info.paid_credits/10 }</span>元</div>
                    </div>
                </div> 
                </div>
            </NavContent>  
            <NavTabContainer value={this.state.navValue} handleIndexChange={this.handleNavIndexChange.bind(this)}> 
                <NavTabItem value='retail-list'>分销列表</NavTabItem>
                <NavTabItem value='settle-list'>结算记录</NavTabItem>
                <NavTabItem value='retail-rules'>分销规则</NavTabItem>
            </NavTabContainer> 
            
        </NavHead>
            <div className='content'>
              {this.props.children}
            </div>
      </div>
    );
  }
}
