import React from 'react';
import './style.scss';
import {TabItem,TabContainer} from '../../common_component/Tabs';
import CreateGift from './CreateGift';
import GiftList from './GiftList';
import BackToHome from '../../common_component/BackToHome';
export default class Gift extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      curTab:0

    }
  }

  handleTabIndexChange(i){
    this.setState({curTab:i});
  }
  render(){
    const {curTab} = this.state;
    return (
      <div className="gift theme-red">
        <TabContainer className="tab-fixed"
                      activeItem={curTab}
                      handleIndexChange={this.handleTabIndexChange.bind(this)}
        >
          <TabItem>赠送礼物</TabItem>
          <TabItem>我的赠送</TabItem>
        </TabContainer>

        <div className="gift-container">
          {curTab==0?(<CreateGift/>):(<GiftList/>)}
        </div>
        <BackToHome/>
      </div>
    );
  }
}
