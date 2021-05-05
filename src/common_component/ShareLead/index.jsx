//== ShareLead
//

import React from 'react';

class ShareLead extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const {type,show} = this.props;
    return show?(
      <div className="share-lead" onClick={this.props.onRequestClose} >
        <h2>{type=='invite'?'邀请好友':'分享打卡'}</h2>
        <img className="lead-img" src={type=='invite'?"img/share-lead.png":'img/share-lead-friends.png'}/>
        <br/>
        <p>{type=='invite'?'点击右上角分享好友':'点击右上角分享到朋友圈'}</p>
        <img className="share-arrow" src="img/share-arrow.png"/>
      </div>
    ):null
  }
}
export default ShareLead;